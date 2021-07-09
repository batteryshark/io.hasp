import HaspConst
class HaspContainer(object):
    def __init__(self):
        self.memory = {
            HaspConst.HASP_FILEID_RO:bytearray(112),
            HaspConst.HASP_FILEID_RW:bytearray(112)
        }
        self.keytable = {
            "request":"response"
        }


class HaspServer(object):
    def __init__(self):
        pass


if(__name__=="__main__"):
    pass