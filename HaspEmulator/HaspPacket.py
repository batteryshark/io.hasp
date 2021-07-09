import struct
import HaspConst
import HaspProtocol

class HaspPacket(object):
    def generate_header(self,transaction_num,packet_type,apiuid,data_len,head_value=1,tail_value=0):
        head_body = struct.pack("<H",head_value)
        head_body += struct.pack("<I",transaction_num)
        head_body += struct.pack("<I",apiuid)
        head_body += struct.pack("<I",packet_type)
        head_body += struct.pack("<I",tail_value)
        content_len = len(head_body)
        head_body = b"\x34" + struct.pack("B",content_len) + head_body
        packet_len = 4 + content_len + 2 + data_len
        return struct.pack("<I",packet_len) + head_body


    def parse_header(self,data):
        return {
            'packet_size':struct.unpack("<I",data[0:4])[0],
            'head_value':struct.unpack("<H",data[6:8])[0],
            'transaction_num':struct.unpack("<I",data[8:12])[0],
            'session_id':struct.unpack("<I",data[12:16])[0],
            'packet_type':struct.unpack("<I",data[16:20])[0],
            'tail_value':struct.unpack("<I",data[20:24])[0]
        }

    def generate(self,transaction_num,apiuid,op_packet,head_value=1,tail_value=0):
        packet_data = op_packet.serialize()
        header = self.generate_header(transaction_num,op_packet.packet_type,apiuid,len(packet_data),head_value,tail_value)
        return header + packet_data

    def parse(self,data,pack_obj):
        header = self.parse_header(data)
        pack_obj.parse(data[24:])
        return pack_obj

