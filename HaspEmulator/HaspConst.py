# Custom Defines
HEADER_SZ = 24

# Status Codes
HASP_STATUS_OK = 0
HASP_INV_VCODE = 22
HASP_INV_HND = 9
HASP_TOO_SHORT = 8


# API Constants
HASP_FILEID_RW = 0xfff4
HASP_FILEID_RO = 0xfff5

SCOPE_LM = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><haspscope><hasp type=\"HASP-HL\"><license_manager ip=\"127.0.0.1\" /></hasp></haspscope>"
SCOPE_HANDLE = "<haspscope><session handle=\"%d\"/></haspscope>"
FORMAT_GETID = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><haspformat><hasp><attribute name=\"id\" /></hasp></haspformat>"
FORMAT_GETSESSION = "<haspformat root=\"hasp_info\"><si_feature /></haspformat>"
FORMAT_GETKEYINFO = "<haspformat root=\"hasp_info\"><si_container /></haspformat>"

SPEC_FEATURE_ID = "<haspspec><feature id=\"%d\" /></haspspec>"

# Internal Constants
PK_TYPE_LOGIN = 0x2711
PK_TYPE_LOGOUT = 0x2712
PK_TYPE_LOGINSCOPE = 0x2713
PK_TYPE_GETINFO = 0x2714
PK_TYPE_SCHANNEL = 0x2716
PK_TYPE_ENCRYPT =0x2724
PK_TYPE_DECRYPT = 0x2725
PK_TYPE_READ = 0x271A
PK_TYPE_WRITE = 0x271B
PK_TYPE_GETSIZE = 0x271C
PK_TYPE_GETRTC = 0x271D
PK_TYPE_APIUID = 0x2774
PK_TYPE_UPDATE = 0x2775


PK_ID_LOGIN_REQ = 0x61
PK_ID_LOGIN_REP = 0x62
PK_ID_LOGINSCOPE_REQ = 0x63
PK_ID_LOGINSCOPE_REP = 0x64
PK_ID_LOGOUT_REQ = 0x65
PK_ID_LOGOUT_REP = 0x66
PK_ID_INFO_REQ = 0x67
PK_ID_INFO_REP = 0x68
PK_ID_READ_REQ = 0x6A
PK_ID_READ_REP = 0x6B
PK_ID_WRITE_REQ = 0x6C
PK_ID_WRITE_REP = 0x6D
PK_ID_GETSIZE_REQ = 0x6E
PK_ID_GETSIZE_REP = 0x6F
PK_ID_GETRTC_REQ = 0x70
PK_ID_GETRTC_REP = 0x71
PK_ID_SCHANNEL_REQ = 0x72
PK_ID_SCHANNEL_REP = 0x73
PK_ID_CRYPT_REQ = 0x77
PK_ID_CRYPT_REP = 0x78
PK_ID_APIUID_REQ = 0x7F34
PK_ID_APIUID_REP =0x7F35

