import struct,binascii

def asn1_get_items(data):
    items = {}
    offset = 0
    while(offset < len(data)):
        id = struct.unpack("B",data[offset:offset+1])[0]
        offset+=1
        item_len = 0
        if(data[offset] == 0x82 or data[offset] == "\x82"):
            offset+=1
            item_len = struct.unpack(">H",data[offset:offset+2])[0]
            offset+=2
        elif(data[offset] == 0x81 or data[offset]  == "\x81"):
            offset+=1
            item_len = struct.unpack("B",data[offset:offset+1])[0]
            offset+=1
        else:
            item_len = struct.unpack("B",data[offset:offset+1])[0]
            offset+=1
        bdata = data[offset:offset+item_len]
        items[id] = bdata
        offset+=item_len

    return items

def asn1_get_intval(data):
    dlen = len(data)
    if(dlen == 1):
        return struct.unpack("B",data)[0]
    elif(dlen == 2):
        return struct.unpack(">H",data)[0]
    elif(dlen == 3):
        return struct.unpack(">I",b"\x00"+data)[0]
    elif(dlen == 4):
        return struct.unpack(">I",data)[0]
    elif(dlen == 5):
        return struct.unpack(">I",data[1:])[0]
    else:
        print("WARN: Intval, unknown length %d" % dlen)
        return 0

def asn1_get_strval(data):
    dlen = len(data)
    return data[:-1].decode('ascii')

def asn1_pack_strval(val):
    sval = val.encode("ascii")+b"\x00"
    return len(sval),sval

def asn1_pack_intval(val,blen=0):
    if(blen == 0):
        if(val < 127):
            return 1,struct.pack("B",val)
        elif(val > 127 and val < 255):
            return 1,struct.pack("B",val)
        elif(val < 65535):
            return 2,struct.pack(">H",val)
        else:
            return 4,struct.pack(">I",val)
    else:
        if(blen == 1):
            return 1,struct.pack("B",val)
        elif(blen == 2):
            return 2,struct.pack(">H",val)
        elif(blen == 3):
            return 3,struct.pack(">I",val)[1:]
        elif(blen == 4):
            return 4,struct.pack(">I",val)
        elif(blen == 5):
            return 5,b"\x00"+struct.pack(">I",val)
        else:
            print("Unhandled blen value: %d" % blen)
            return 1,b"\x00"

def asn1_pack(aobj):
    pdata = b""
    for ok in aobj.keys():
        if(ok > 255):
            oid = struct.pack(">H",ok)
        else:
            oid = struct.pack("B",ok)
        odata = asn1_pack_items(aobj[ok])
        olen = len(odata)
        if(olen > 127):
            if(olen > 127 and olen < 255):
                oblen = b"\x81"+struct.pack("B",olen)
            else:
                oblen = b"\x82"+struct.pack(">H",olen)
        else:
            oblen = struct.pack("B",olen)
        pdata+= oid+oblen+odata

    return pdata


def asn1_pack_items(items):
    packed = b""
    for ik in items.keys():
        itag = struct.pack("B",ik)
        item = items[ik]
        if(not 'type' in item.keys()):
            ilen = len(item['value'])
            ival = item['value']
        elif(item['type'] == 'intval'):
            if(not "blen" in item.keys()):
                blen = 0
            else:
                blen = item['blen']
            ilen,ival = asn1_pack_intval(item['value'],blen)
        elif(item['type'] == 'strval'):
            ilen,ival = asn1_pack_strval(item['value'])
        else:
            print("Unknown Type: %s" % item['type'])

        if(ilen > 127):
            if(ilen < 255):
                packed += itag + b"\x81"+struct.pack("B",ilen) + ival
            else:
                packed += itag + b"\x82"+ struct.pack(">H",ilen) + ival
        else:
            packed += itag + struct.pack("B",ilen) + ival

    return packed

# Max 1 byte len is 0x7F because anything after that might be interpreted as a command.
def de_asn1(data):
    objs = {}
    offset = 0

    while(offset < len(data)):
        obj_base = struct.unpack("B",data[offset:offset+1])[0]
        offset+=1
        if(obj_base == 0x7F):
            offset-=1
            obj_base = struct.unpack(">H",data[offset:offset+2])[0]
            offset+=2
        obj_len = 0


        if(data[offset] == "\x82"):
            offset+=1

            obj_len = struct.unpack(">H",data[offset:offset+2])[0]
            offset+=2
        elif(data[offset] == "\x81"):
            offset+=1
            obj_len = struct.unpack("B",data[offset:offset+1])[0]
            offset+=1
        else:
            obj_len = struct.unpack("B",data[offset:offset+1])[0]
            offset+=1
        # Now, for obj_len, get items and load them.

        obj_bdata = data[offset:offset+obj_len]

        objs[obj_base] = asn1_get_items(obj_bdata)
        offset+=obj_len
    return objs

if(__name__=="__main__"):
    test_data = binascii.unhexlify("68820188800100818201813c3f786d6c2076657273696f6e3d22312e302220656e636f64696e673d225554462d3822203f3e0a3c686173705f696e666f3e0a20203c666561747572653e0a202020203c6665617475726569643e313c2f6665617475726569643e0a202020203c6d61786c6f67696e733e756e6c696d697465643c2f6d61786c6f67696e733e0a202020203c636f6e63757272656e63793e0a2020202020203c6578706f72743e6c6f63616c3c2f6578706f72743e0a2020202020203c636f756e743e73746174696f6e3c2f636f756e743e0a202020203c2f636f6e63757272656e63793e0a202020203c766d656e61626c65643e747275653c2f766d656e61626c65643e0a202020203c63757272656e746c6f67696e733e313c2f63757272656e746c6f67696e733e0a202020203c6c6963656e73653e0a2020202020203c6c6963656e73653e70657270657475616c3c2f6c6963656e73653e0a202020203c2f6c6963656e73653e0a20203c2f666561747572653e0a3c2f686173705f696e666f3e0a00")
    obj_data = de_asn1(test_data)
    print(obj_data)

    rb = {}
    rb[0x65] = {
    0x80:{'value':0x26,'blen':1,'type':'intval'},
    0x81:{'value':0,'blen':1,'type':'intval'},
    0x82:{'value':'FUCK YOU','type':'strval'},
    0x83:{'value':b"\x13\x37"}
    }
    bdata = asn1_pack(rb)
    print(binascii.hexlify(bdata))

