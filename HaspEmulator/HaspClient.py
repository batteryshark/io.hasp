import HaspSocket
import HaspConst
import HaspSession

class HaspClient(object):
    def __init__(self):
        self.sock = HaspSocket.HaspSocketClient()
        self.sessions = {}

    def login(self, feature_id, vendor_blob,session_key):
        hs = HaspSession.HaspSession(vendor_blob,session_key)
        if (hs.vendor_code.is_valid == False):
            print("Invalid Vendor Code")
            del hs
            return HaspConst.HASP_INV_VCODE

        # Do the Login req/resp
        status = hs.session_login(self.sock,feature_id)
        # If everything is good.
        self.sessions[hs.handle] = hs
        return status,hs.handle

    def login_scope(self, feature_id, scope, vendor_blob,session_key):
        hs = HaspSession.HaspSession(vendor_blob,session_key)
        if (hs.vendor_code.is_valid == False):
            print("Invalid Vendor Code")
            del hs
            return HaspConst.HASP_INV_VCODE

        # Do the Login req/resp
        status = hs.session_login_scope(self.sock,feature_id,scope)
        # If everything is good.
        self.sessions[hs.handle] = hs
        return status,hs.handle

    def logout(self, handle_id):
        if (not handle_id in self.sessions.keys()):
            print("Handle Does not Exist")
            return HaspConst.HASP_INV_HND
        sess = self.sessions[handle_id]
        # Logout Packet Request/Response
        # if everything is good,
        status = sess.session_logout(self.sock)
        # Remove the hasp handle.
        self.sessions.pop(handle_id, None)
        return status

    def read(self,handle,file_id,offset,amount):
        if(not handle in self.sessions.keys()):
            print("Invalid Handle")
            return HaspConst.HASP_INV_HND,""
        sess = self.sessions[handle]
        status,data = sess.session_read(self.sock,file_id,offset,amount)
        return status,data

    def write(self,handle,file_id,offset,data):
        if(not handle in self.sessions.keys()):
            print("Invalid Handle")
            return HaspConst.HASP_INV_HND
        sess = self.sessions[handle]
        return sess.session_write(self.sock,data,file_id,offset)

    def get_session_info(self,handle):
        if(not handle in self.sessions.keys()):
            print("Invalid Handle")
            return HaspConst.HASP_INV_HND
        sess = self.sessions[handle]
        scope = HaspConst.SCOPE_HANDLE % sess.handle
        format = HaspConst.FORMAT_GETSESSION
        status,info = sess.session_info(self.sock,scope,format)
        return status,info

    def get_key_info(self,handle):
        if(not handle in self.sessions.keys()):
            print("Invalid Handle")
            return HaspConst.HASP_INV_HND
        sess = self.sessions[handle]
        scope = HaspConst.SCOPE_HANDLE % sess.handle
        format = HaspConst.FORMAT_GETKEYINFO
        status,info = sess.session_info(self.sock,scope,format)
        return status,info

    def get_info(self,handle):
        if(not handle in self.sessions.keys()):
            print("Invalid Handle")
            return HaspConst.HASP_INV_HND
        sess = self.sessions[handle]
        scope = HaspConst.SCOPE_LM
        format = HaspConst.FORMAT_GETID
        status,info = sess.session_info(self.sock,scope,format)
        return status,info

    def get_size(self,handle,file_id):
        if(not handle in self.sessions.keys()):
            print("Invalid Handle")
            return HaspConst.HASP_INV_HND
        sess = self.sessions[handle]
        return sess.get_size(self.sock,file_id)

    def get_rtc(self,handle):
        if (not handle in self.sessions.keys()):
            print("Invalid Handle")
            return HaspConst.HASP_INV_HND
        sess = self.sessions[handle]
        return sess.get_rtc(self.sock)

    def encrypt(self,handle,indata):
        if(not handle in self.sessions.keys()):
            print("Invalid Handle")
            return HaspConst.HASP_INV_HND
        sess = self.sessions[handle]
        return sess.session_encrypt(self.sock,indata)

    def decrypt(self,handle,indata):
        if(not handle in self.sessions.keys()):
            print("Invalid Handle")
            return HaspConst.HASP_INV_HND
        sess = self.sessions[handle]
        return sess.session_decrypt(self.sock,indata)




def test_info(hH,hc):
    status,info = hc.get_info(hH)
    if(status != 0):
        print("Get_Info Failed: %04X\n" % status)
    else:
        print("Get_Info OK:")
        print(info)

    status,info = hc.get_session_info(hH)
    if(status != 0):
        print("Get_Session_Info Failed: %04X\n" % status)
    else:
        print("Get_Session_Info OK:")
        print(info)

    status,info = hc.get_key_info(hH)
    if(status != 0):
        print("Get_Key_Info Failed: %04X\n" % status)
    else:
        print("Get_Key_Info OK:")
        print(info)

def test_read_write(hH,hc):
    test_w_data = b"\xd8" * 32
    test_w_data = bytearray([
        0x4C, 0x49, 0x4E, 0x47, 0x20, 0x47, 0x52, 0x45, 0x47, 0x4F, 0x52, 0x59, 0x20, 0x49, 0x53, 0x20,
        0x54, 0x48, 0x45, 0x20, 0x42, 0x49, 0x47, 0x47, 0x45, 0x53, 0x54, 0x20, 0x46, 0x55, 0x43, 0x4B
    ])
    status,data = hc.read(hH,HaspConst.HASP_FILEID_RW,0,len(test_w_data))
    if(status != 0):
        print("HASP Read Error: %04X\n",status)
    else:
        print("Hasp Read: %s" % binascii.hexlify(data))
        print(data)

    status = hc.write(hH,HaspConst.HASP_FILEID_RW,0,test_w_data)
    if(status != 0):
        print("HASP Write Error: %04X\n",status)
    else:
        print("Write OK!")

def test_encdec(hH,hc,amt):
    TEST_PLAINTEXT = "WTFCHARLES123456WTFCHARLES123456WTFCHARLES123456WTFCHARLES123456WTFCHARLES123456WTFCHARLES123456WTFCHARLES123456WTFCHARLES123456"[:amt]

    encdata = TEST_PLAINTEXT
    status,encdata = hc.encrypt(hH,TEST_PLAINTEXT)
    if(status != 0):
        print("Hasp Encrypt Error: %04X\n",status)
    else:
        print("Encrypted Data: %s" % binascii.hexlify(encdata))

    status,decdata = hc.decrypt(hH,encdata)
    if(status != 0):
        print("Hasp Decrypt Error: %04X\n",status)
    else:
        print("Decrypted Data: %s" % binascii.hexlify(decdata))
        if(TEST_PLAINTEXT == decdata):
            print("Encrypt/Decrypt OK!")
        else:
            print("Encrypt/Decrypt Doesn't Match!")


def test_get_size(hH,hc,file_id):
    status,file_size = hc.get_size(hH,file_id)
    if(status != 0):
        print("Get Size Failed: %04X\n" % status)
    else:
        print("Get Size: OK!")
        print("Size of FILE_ID %04X = %d bytes" % (file_id,file_size))

def test_get_rtc(hH,hc):
    status,timestamp = hc.get_rtc(hH)
    if(status != 0):
        print("Get RTC Error: %04X" % status)
    else:
        print("Get RTC OK!")
        print("Timestamp : %d" % timestamp)

def test_login_scope(hc,feature_id,hVC,sk,scope):
    status,hH = hc.login_scope(feature_id,scope,hVC,sk)
    if(status != 0):
        print("Hasp Login Scope Failed: %04X\n" % status)
        return
    else:
        print("Login Scope OK! Logging out...")
        hc.logout(hH)
"""
What Works So far:
Login
Logout
Schannel
Info (all)
Encrypt/Decrypt (small - 16 bytes)
Read
Encrypt/Decrypt (large)
Encrypt/Decrypt (medium)
Write

"""

if(__name__=="__main__"):
    import binascii
    print("Client Started")
    test_hvc = "hqSo78uKYtq17B5WYlTnnDbu5Pw4VMJqrXVVT8yAW1NaY8D1VwqWYCZdc3A+x5WL9pygJB4i31TbzhjSdUCBhSAwx9r6AIQVJVCOFlSkixWHOmfBK9kbj9UOU/jl73FOHo8NVMDXpu7s4NBBhJyUENjbcHrttt2tF7Mi95ksnaOXSorhIZh8o1MGwWW0Qf3NTKcTxkpsgSGz50m1kidQZ6JWZpS4GBGvSDacF4YyalaqPDFjuiuZGyUS5l/kfm6t2nBSRNzeECbjw3H0iAe7vnMagvYBYIg6qjiFVvrqS+v8muVJmLMlnk5qSHe/ahnMTCB68Y5IJ2kdpvkS5Gd8A9QLbxZJDcRiOrwugjiPg8baDvPs2D9GreFS++jMLfUgKamTcEeFcJO1Pb0uPaognXpgqPjqNt6jnEnytSLKs6+CD4sdaJAPllks0PEZaAxpUOlnDVn8LEI3tbh+q165/4KGXkS0Txi1s4fKtMsZkaC5c53mtxLexhuHRBOQ8avwWfg3NiL3tgMcmWheo+khkG6m0POS09IjaT3iBP+WUvtBJtAH41ZOhI5EicPJgRK8Cby+j9RnmfIca/E0kD/DqU0FksWjNe2up3zsJF2cHpdSzc4Q+IqkonxiRioM38+CWquhWRndTLTbCO1Yk62TUsVhixouYAiVrsPgIMzgTlf11e496lmKnQB/lNMKdvtEeEnj+1S8w5u22yR9Yy73GJUgMUwNj0CFg8qWRRSBhZvjUN5s2y6BwXLfJKYZM+Zk7J2BsT8J/FNUQ0uy6jZwKUpwV6Fdw28mWYUaA6eU381HUEE8LmCEnsRzInyny8YwA3PKR174jeorQqZWkRvagBPguignWYn4/6hRQKs/QhZlSuKlED4URGNfez9iD4HxcQtx4AuKcCnM40q7/OmADYu8vRbOxnCMYoQsGK06ZHM="
    test_session_key = b"\x1E\xC5\xDA\x24\x45\x3C\x6C\x6C\xF5\xDE\x23\xE3\xA6\x85\x3A\xC8"
    hc = HaspClient()



    status,hH = hc.login(1,test_hvc,test_session_key)
    if(status != 0):
        print("Login Failed: %04X" % status)
    else:
        print("Logged In")
    #test_info(hH,hc)
    #test_read_write(hH,hc)
    # test_login_scope(hc,1,test_hvc,test_session_key,HaspConst.SCOPE_LM)
    #test_encdec(hH,hc,64)
    #test_get_size(hH,hc,HaspConst.HASP_FILEID_RO)
    test_get_rtc(hH,hc)
    hc.logout(hH)