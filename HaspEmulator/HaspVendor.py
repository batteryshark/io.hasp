
import base64,struct
import HaspUtils
VENDOR_KEY = b"\x83\xEC\x0C\x56\x8B\x74\x24\x14\x8D\x44\x24\x04\x50\x6A\x08\x8D"

class HaspVendor(object):
    def __init__(self,hVC):
        self.bdata = hVC
        self.is_valid = False
        self.vendor_id = 0
        if(self.bdata[0:4] != b"2xCV"):
            print("Vendor Blob is Base64 Encoded / Encrypted...")
            self.bdata = base64.b64decode(self.bdata)
            self.bdata = HaspUtils.aes_cbc_decrypt(self.bdata,VENDOR_KEY)

        if(self.bdata[0:4] != b"2xCV"):
            print("Vendor Blob is Invalid")
            return
        self.is_valid = True
        self.vendor_id = struct.unpack("<I",self.bdata[16:20])[0]



