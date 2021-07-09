# HASP API Constants

# Feature Type Mask - gets the feature type values.
HASP_FEATURETYPE_MASK = 0xFFFF0000

# Program Number Feature Type Mask - Get the prognum featuretype after AND-ing with the FEATURETYPE_MASK
HASP_PROGNUM_FEATURETYPE = 0xFFFF0000

# Program Number Mask - Get the Program Number from a "prognum" Feature ID
HASP_PROGNUM_MASK = 0x000000FF

"""
Program Number Options
"""

# The mask for options - last 3 bits are reserved for future use.
HASP_PROGNUM_OPT_MASK = 0x0000FF00

# Disables local license search.
HASP_PROGNUM_OPT_NO_LOCAL = 0x00008000

# Disables network license search.
HASP_PROGNUM_OPT_NO_REMOTE = 0x00004000

# Sets session count to "per-process"
HASP_PROGNUM_OPT_PROCESS = 0x00002000

# Enables API to use "classic" (HASP4 or previous) keys.
HASP_PROGNUM_OPT_CLASSIC = 0x00001000

# Ignores Terminal Services (e.g. Remote Desktop)
HASP_PROGNUM_OPT_TS = 0x00000800

"""
Feature IDs
"""
# The default FeatureID (always available).
HASP_DEFAULT_FID = 0

# The default FeatureID (Legacy)
HASP_PROGNUM_DEFAULT_FID = HASP_DEFAULT_FID | HASP_PROGNUM_FEATURETYPE

"""
File IDs (Hasp Memory)
"""

# FileID for HASP4+ Memory contents (R/W) (w/o FAS)
HASP_FILEID_MAIN = 0xFFF0

# FileID for license data (FAS Memory)
HASP_FILEID_LICENSE = 0xFFF2

# FileID for secure readable/writable memory file.
HASPID_FILEID_RW = 0xFFF4

# FileID for secure ROM file.
HASP_FILEID_RO = 0xFFF5

# FileID (custom) start value.
HASP_FILEID_DYNAMIC_FIRST = 0x01

# FileID (custom) max value.
HASP_FILEID_DYNAMIC_LAST = 0xFFBF

"""
Error Codes
"""
HASP_STATUS_OK = 0
HASP_MEM_RANGE = 1
HASP_INV_PROGNUM_OPT = 2
HASP_INSUF_MEM = 3
HASP_TMOF = 4
HASP_ACCESS_DENIED = 5
HASP_INCOMPAT_FEATURE = 6
HASP_HASP_NOT_FOUND = 7
HASP_TOO_SHORT = 8
HASP_INV_HND = 9
HASP_INV_FILEID = 10
HASP_OLD_DRIVER = 11
HASP_NO_TIME = 12
HASP_SYS_ERR = 13
HASP_NO_DRIVER = 14
HASP_INV_FORMAT = 15
HASP_REQ_NOT_SUPP = 16
HASP_INV_UPDATE_OBJ = 17
HASP_KEYID_NOT_FOUND = 18
HASP_INV_UPDATE_DATA = 19
HASP_INV_UPDATE_NOTSUPP = 20
HASP_INV_UPDATE_CNTR = 21
HASP_INV_VCODE = 22
HASP_ENC_NOT_SUPP = 23
HASP_INV_TIME = 24
HASP_NO_BATTERY_POWER = 25
HASP_NO_ACK_SPACE = 26
HASP_TS_DETECTED = 27
HASP_FEATURE_TYPE_NOT_IMPL = 28
HASP_UNKNOWN_ALG = 29
HASP_INV_SIG = 30
HASP_FEATURE_NOT_FOUND = 31
HASP_NO_LOG = 32
HASP_LOCAL_COMM_ERR = 33
HASP_UNKNOWN_VCODE = 34
HASP_INV_SPEC = 35
HASP_INV_SCOPE = 36
HASP_TOO_MANY_KEYS = 37
HASP_TOO_MANY_USERS = 38
HASP_BROKEN_SESSION = 39
HASP_REMOTE_COMM_ERR = 40
HASP_FEATURE_EXPIRED = 41
HASP_OLD_LM = 42
HASP_DEVICE_ERR = 43
HASP_UPDATE_BLOCKED = 44
HASP_TIME_ERR = 45
HASP_SCHAN_ERR = 46
HASP_STORAGE_CORRUPT = 47
HASP_NO_VLIB = 48
HASP_INV_VLIB = 49
HASP_SCOPE_RESULTS_EMPTY = 50
HASP_VM_DETECTED = 51
HASP_HARDWARE_MODIFIED = 52
HASP_USER_DENIED = 53
HASP_UPDATE_TOO_OLD = 54
HASP_UPDATE_TOO_NEW = 55
HASP_OLD_VLIB = 56
HASP_UPLOAD_ERROR = 57
HASP_INV_RECIPIENT = 58
HASP_INV_ACTION = 59
HASP_TOO_MANY_PRODUCTS = 60
HASP_INV_PRODUCT = 61
HASP_UNKNOWN_RECIPIENT = 62
HASP_INV_DURATION = 63
HASP_CLONE_DETECTED = 64
HASP_UPDATE_ALREADY_ADDED = 65
HASP_HASP_INACTIVE = 66
HASP_NO_DETACHABLE_FEATURE = 67
HASP_TOO_MANY_HOSTS = 68
HASP_REHOST_NOT_ALLOWED = 69
HASP_LICENSE_REHOSTED = 70
HASP_REHOST_ALREADY_APPLIED = 71
HASP_CANNOT_READ_FILE = 72
HASP_EXTENSION_NOT_ALLOWED = 73
HASP_DETACH_DISABLED = 74
HASP_REHOST_DISABLED = 75
HASP_DETACHED_LICENSE_FOUND = 76
HASP_RECIPIENT_OLD_LM = 77
HASP_SECURE_STORE_ID_MISMATCH = 78
HASP_DUPLICATE_HOSTNAME = 79
HASP_NO_API_DYLIB = 400
HASP_INV_API_DYLIB = 401
HASP_INVALID_PARAMETER = 501
HASP_INVALID_OBJECT = 500
HASP_ALREADY_LOGGED_IN = 502
HASP_ALREADY_LOGGED_OUT = 503
HASP_OPERATION_FAILED = 525
HASP_NO_EXTBLOCK = 600
HASP_INV_PORT_TYPE = 650
HASP_INV_PORT = 651
HASP_NET_DLL_BROKEN = 652
HASP_NOT_IMPL = 698
HASP_INT_ERR = 699
HASP_FIRST_HELPER = 2001
HASP_FIRST_HASP_ACT = 3001
HASP_NEXT_FREE_VALUES = 7001

# Detail for status codes.
ERROR_DB = {
    HASP_STATUS_OK:{"HASP_STATUS_OK","Request successfully completed."},
    HASP_MEM_RANGE:{"HASP_MEM_RANGE","Request exceeds memory range of a Sentinel file."},
    HASP_INV_PROGNUM_OPT:{"HASP_INV_PROGNUM_OPT","Legacy HASP HL Run-time API: Unknown/Invalid Feature ID option."},
    HASP_INSUF_MEM:{"HASP_INSUF_MEM","System is out of memory."},
    HASP_TMOF:{"HASP_TMOF","Too many open Features/login sessions."},
    HASP_ACCESS_DENIED:{"HASP_ACCESS_DENIED","Access to Feature, Sentinel protection key or functionality denied."},
    HASP_INCOMPAT_FEATURE:{"HASP_INCOMPAT_FEATURE","Legacy decryption function cannot work on Feature."},
    HASP_HASP_NOT_FOUND:{"HASP_HASP_NOT_FOUND","Sentinel protection key not available."},
    HASP_TOO_SHORT:{"HASP_TOO_SHORT","Encrypted/decrypted data length too short to execute function call."},
    HASP_INV_HND:{"HASP_INV_HND","Invalid login handle passed to function."},
    HASP_INV_FILEID:{"HASP_INV_FILEID","Specified File ID not recognized by API."},
    HASP_OLD_DRIVER:{"HASP_OLD_DRIVER","Installed driver or daemon too old to execute function."},
    HASP_NO_TIME:{"HASP_NO_TIME","Real-time clock (rtc) not available."},
    HASP_SYS_ERR:{"HASP_SYS_ERR","Generic error from host system call."},
    HASP_NO_DRIVER:{"HASP_NO_DRIVER","Required driver not installed."},
    HASP_INV_FORMAT:{"HASP_INV_FORMAT","Invalid XML format."},
    HASP_REQ_NOT_SUPP:{"HASP_REQ_NOT_SUPP","Unable to execute function in this context - functionality not implemented."},
    HASP_INV_UPDATE_OBJ:{"HASP_INV_UPDATE_OBJ","Binary data passed to function does not contain valid update."},
    HASP_KEYID_NOT_FOUND:{"HASP_KEYID_NOT_FOUND","Sentinel protection key not found."},
    HASP_INV_UPDATE_DATA:{"HASP_INV_UPDATE_DATA","Required XML tags not found or binary data missing or invalid."},
    HASP_INV_UPDATE_NOTSUPP:{"HASP_INV_UPDATE_NOTSUPP","Update request not supported by Sentinel protection key."},
    HASP_INV_UPDATE_CNTR:{"HASP_INV_UPDATE_CNTR","Update counter set incorrectly."},
    HASP_INV_VCODE:{"HASP_INV_VCODE","Invalid Vendor Code passed."},
    HASP_ENC_NOT_SUPP:{"HASP_ENC_NOT_SUPP","Sentinel protection key does not support encryption type."},
    HASP_INV_TIME:{"HASP_INV_TIME","Passed time value outside supported value range."},
    HASP_NO_BATTERY_POWER:{"HASP_NO_BATTERY_POWER","Real-time clock battery out of power."},
    HASP_NO_ACK_SPACE:{"HASP_NO_ACK_SPACE","Acknowledge data requested by update, but ack-data is NULL."},
    HASP_TS_DETECTED:{"HASP_TS_DETECTED","Program running on a terminal server."},
    HASP_FEATURE_TYPE_NOT_IMPL:{"HASP_FEATURE_TYPE_NOT_IMPL","Requested Feature type not implemented."},
    HASP_UNKNOWN_ALG:{"HASP_UNKNOWN_ALG","Unknown algorithm used in H2R/V2C file."},
    HASP_INV_SIG:{"HASP_INV_SIG","Signature verification operation failed."},
    HASP_FEATURE_NOT_FOUND:{"HASP_FEATURE_NOT_FOUND","Requested Feature not available."},
    HASP_NO_LOG:{"HASP_NO_LOG","Access log not enabled."},
    HASP_LOCAL_COMM_ERR:{"HASP_LOCAL_COMM_ERR","Communication error between API and local Sentinel License Manager."},
    HASP_UNKNOWN_VCODE:{"HASP_UNKNOWN_VCODE","Vendor Code not recognized by API."},
    HASP_INV_SPEC:{"HASP_INV_SPEC","Invalid XML specification."},
    HASP_INV_SCOPE:{"HASP_INV_SCOPE","Invalid XML scope."},
    HASP_TOO_MANY_KEYS:{"HASP_TOO_MANY_KEYS","Too many Sentinel protection keys match the scope."},
    HASP_TOO_MANY_USERS:{"HASP_TOO_MANY_USERS","Too many concurrent user sessions currently connected."},
    HASP_BROKEN_SESSION:{"HASP_BROKEN_SESSION","Session been interrupted."},
    HASP_REMOTE_COMM_ERR:{"HASP_REMOTE_COMM_ERR","Communication error between local and remote Sentinel License Managers."},
    HASP_FEATURE_EXPIRED:{"HASP_FEATURE_EXPIRED","Feature expired."},
    HASP_OLD_LM:{"HASP_OLD_LM","Sentinel License Manager version too old."},
    HASP_DEVICE_ERR:{"HASP_DEVICE_ERR","I/O Error (SL Key) or USB Communication Error (HL Key)."},
    HASP_UPDATE_BLOCKED:{"HASP_UPDATE_BLOCKED","Update installation not permitted; This update was already applied."},
    HASP_TIME_ERR:{"HASP_TIME_ERR","System time has been tampered with."},
    HASP_SCHAN_ERR:{"HASP_SCHAN_ERR","Communication error occurred in secure channel."},
    HASP_STORAGE_CORRUPT:{"HASP_STORAGE_CORRUPT","Corrupt data exists in secure storage area of Sentinel SL protection key."},
    HASP_NO_VLIB:{"HASP_NO_VLIB","Unable to find Vendor library."},
    HASP_INV_VLIB:{"HASP_INV_VLIB","Unable to load Vendor library."},
    HASP_SCOPE_RESULTS_EMPTY:{"HASP_SCOPE_RESULTS_EMPTY","Unable to locate any Feature matching scope."},
    HASP_VM_DETECTED:{"HASP_VM_DETECTED","Program running on a virtual machine."},
    HASP_HARDWARE_MODIFIED:{"HASP_HARDWARE_MODIFIED","Sentinel SL key incompatible with machine hardware."},
    HASP_USER_DENIED:{"HASP_USER_DENIED","Login denied because of user restrictions."},
    HASP_UPDATE_TOO_OLD:{"HASP_UPDATE_TOO_OLD","Update is too old."},
    HASP_UPDATE_TOO_NEW:{"HASP_UPDATE_TOO_NEW","Update is too new (did you skip one?)"},
    HASP_OLD_VLIB:{"HASP_OLD_VLIB","Vendor library version too old."},
    HASP_UPLOAD_ERROR:{"HASP_UPLOAD_ERROR","Upload via ACC failed, e.g. because of illegal format."},
    HASP_INV_RECIPIENT:{"HASP_INV_RECIPIENT","Invalid XML \"recipient\" parameter."},
    HASP_INV_ACTION:{"HASP_INV_ACTION","Invalid XML \"action\" parameter."},
    HASP_TOO_MANY_PRODUCTS:{"HASP_TOO_MANY_PRODUCTS","Scope does not specify a unique Product."},
    HASP_INV_PRODUCT:{"HASP_INV_PRODUCT","Invalid Product information."},
    HASP_UNKNOWN_RECIPIENT:{"HASP_UNKNOWN_RECIPIENT","Unknown Recipient."},
    HASP_INV_DURATION:{"HASP_INV_DURATION","Invalid duration."},
    HASP_CLONE_DETECTED:{"HASP_CLONE_DETECTED","Cloned Sentinel SL secure storage detected."},
    HASP_UPDATE_ALREADY_ADDED:{"HASP_UPDATE_ALREADY_ADDED","Specified V2C update already installed in the LLM."},
    HASP_HASP_INACTIVE:{"HASP_HASP_INACTIVE","Specified Hasp Id is in Inactive state."},
    HASP_NO_DETACHABLE_FEATURE:{"HASP_NO_DETACHABLE_FEATURE","No detachable feature exists."},
    HASP_TOO_MANY_HOSTS:{"HASP_TOO_MANY_HOSTS","Scope does not specify a unique host."},
    HASP_REHOST_NOT_ALLOWED:{"HASP_REHOST_NOT_ALLOWED","Rehost is not allowed for any license."},
    HASP_LICENSE_REHOSTED:{"HASP_LICENSE_REHOSTED","License is rehosted to other machine."},
    HASP_REHOST_ALREADY_APPLIED:{"HASP_REHOST_ALREADY_APPLIED","Old rehost license try to apply."},
    HASP_CANNOT_READ_FILE:{"HASP_CANNOT_READ_FILE","File not found or access denied."},
    HASP_EXTENSION_NOT_ALLOWED:{"HASP_EXTENSION_NOT_ALLOWED","Extension of license not allowed - number of detached licenses exceeds concurrenct limit."},
    HASP_DETACH_DISABLED:{"HASP_DETACH_DISABLED"," Detach of license not allowed as product contains VM disabled feature and host is a VM."},
    HASP_REHOST_DISABLED:{"HASP_REHOST_DISABLED","Rehost of license not allowed as container contains VM disabled feature and host is a VM."},
    HASP_DETACHED_LICENSE_FOUND:{"HASP_DETACHED_LICENSE_FOUND","Format SL-AdminMode or migrate SL-Legacy to SL-AdminMode not allowed as container has detached license."},
    HASP_RECIPIENT_OLD_LM:{"HASP_RECIPIENT_OLD_LM","Recipient of the requested operation is older than expected."},
    HASP_SECURE_STORE_ID_MISMATCH:{"HASP_SECURE_STORE_ID_MISMATCH","Secure storage ID mismatch."},
    HASP_DUPLICATE_HOSTNAME:{"HASP_DUPLICATE_HOSTNAME","Duplicate Hostname found while key contains Hostname Fingerprinting."},
    HASP_NO_API_DYLIB:{"HASP_NO_API_DYLIB","API dispatcher: API for this Vendor Code was not found."},
    HASP_INV_API_DYLIB:{"HASP_INV_API_DYLIB","API dispatcher: Unable to load API; DLL possibly corrupt?"},
    HASP_INVALID_PARAMETER:{"HASP_INVALID_PARAMETER","Invalid function parameter."},
    HASP_INVALID_OBJECT:{"HASP_INVALID_OBJECT","C++ API: Object incorrectly initialized."},
    HASP_ALREADY_LOGGED_IN:{"HASP_ALREADY_LOGGED_IN","C++ API: Logging in twice to the same object."},
    HASP_ALREADY_LOGGED_OUT:{"HASP_ALREADY_LOGGED_OUT","C++ API: Logging out twice of the same object."},
    HASP_OPERATION_FAILED:{"HASP_OPERATION_FAILED",".NET API: Incorrect use of system or platform."},
    HASP_NO_EXTBLOCK:{"HASP_NO_EXTBLOCK","Internal use: no classic memory extension block available."},
    HASP_INV_PORT_TYPE:{"HASP_INV_PORT_TYPE","Internal use: invalid port type."},
    HASP_INV_PORT:{"HASP_INV_PORT","Internal use: invalid port value."},
    HASP_NET_DLL_BROKEN:{"HASP_NET_DLL_BROKEN","Dot-Net DLL found broken."},
    HASP_NOT_IMPL:{"HASP_NOT_IMPL","Requested function not implemented."},
    HASP_INT_ERR:{"HASP_INT_ERR","Internal error occurred in API."},
    HASP_FIRST_HELPER:{"HASP_FIRST_HELPER","Reserved for Sentinel helper libraries."},
    HASP_FIRST_HASP_ACT:{"HASP_FIRST_HASP_ACT","Reserved for Sentinel Activation API."},
    HASP_NEXT_FREE_VALUES:{"HASP_NEXT_FREE_VALUES","Reserved"},
}

"""
Info Constants
"""
# format to retrieve update info
HASP_UPDATEINFO = "<haspformat format=\"updateinfo\"/>"
# format to retrieve a small update info (C2V)
HASP_FASTUPDATEINFO = "<haspformat format=\"fastupdateinfo\"/>"
# format to retrieve session info
HASP_SESSIONINFO = "<haspformat format=\"sessioninfo\"/>"
# format to retrieve key/hardware info
HASP_KEYINFO = "<haspformat format=\"keyinfo\"/>"
# format to retrieve host fingerprint info
HASP_FINGERPRINT = "<haspformat format=\"host_fingerprint\"/>"
# format to retrieve recipient parameter for hasp_transfer
HASP_RECIPIENT = """
<haspformat root=\"location\">
  <license_manager>
    <attribute name=\"id\" />
    <attribute name=\"time\" />
    <element name=\"hostname\" />
    <element name=\"version\" />
    <element name=\"host_fingerprint\" />
  </license_manager>
</haspformat>
"""

# Invalid Handle Value for hasp_login() and hasp_login_scope()
HASP_INVALID_HANDLE_VALUE = 0

# Minimum block size for hasp_encrypt/decrypt()
HASP_MIN_BLOCK_SIZE = 16

# Minimum block size for legacy encrypt/decrypt()
HASP_MIN_BLOCK_SIZE_LEGACY = 8