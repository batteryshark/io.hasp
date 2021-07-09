/*
 * ====================================================
 * $Id: errgen.dpr,v 1.4 2009-04-24 13:48:37 axel Exp $
 * ====================================================
 */

function getHaspError (code)
{
  var s='#'+code;
  switch (code) {
    case     0: s='HASP_STATUS_OK;Request successfully completed'; break;
    case     1: s='HASP_MEM_RANGE;Request exceeds memory range of a HASP file'; break;
    case     2: s='HASP_INV_PROGNUM_OPT;Legacy HASP HL Run-time API: Unknown/Invalid Feature ID option'; break;
    case     3: s='HASP_INSUF_MEM;System is out of memory'; break;
    case     4: s='HASP_TMOF;Too many open Features/login sessions'; break;
    case     5: s='HASP_ACCESS_DENIED;Access to Feature, HASP protection key or functionality denied'; break;
    case     6: s='HASP_INCOMPAT_FEATURE;Legacy decryption function cannot work on Feature'; break;
    case     7: s='HASP_HASP_NOT_FOUND;Sentinel HASP protection key not available'; break;
    case     7: s='HASP_CONTAINER_NOT_FOUND;Deprecated - use HASP&nbsp;HASP&nbsp;NOT&nbsp;FOUND'; break;
    case     8: s='HASP_TOO_SHORT;Encrypted/decrypted data length too short to execute function call'; break;
    case     9: s='HASP_INV_HND;Invalid login handle passed to function'; break;
    case    10: s='HASP_INV_FILEID;Specified File ID not recognized by API'; break;
    case    11: s='HASP_OLD_DRIVER;Installed driver or daemon too old to execute function'; break;
    case    12: s='HASP_NO_TIME;Real-time clock (rtc) not available'; break;
    case    13: s='HASP_SYS_ERR;Generic error from host system call'; break;
    case    14: s='HASP_NO_DRIVER;Required driver not installed'; break;
    case    15: s='HASP_INV_FORMAT;Invalid XML format'; break;
    case    16: s='HASP_REQ_NOT_SUPP;Unable to execute function in this context; the requested functionality is not implemented'; break;
    case    17: s='HASP_INV_UPDATE_OBJ;Binary data passed to function does not contain valid update'; break;
    case    18: s='HASP_KEYID_NOT_FOUND;HASP protection key not found'; break;
    case    19: s='HASP_INV_UPDATE_DATA;Required XML tags not found; Contents in binary data are missing or invalid'; break;
    case    20: s='HASP_INV_UPDATE_NOTSUPP;Update request not supported by Sentinel HASP protection key'; break;
    case    21: s='HASP_INV_UPDATE_CNTR;Update counter set incorrectly'; break;
    case    22: s='HASP_INV_VCODE;Invalid Vendor Code passed'; break;
    case    23: s='HASP_ENC_NOT_SUPP;Sentinel HASP protection key does not support encryption type'; break;
    case    24: s='HASP_INV_TIME;Passed time value outside supported value range'; break;
    case    25: s='HASP_NO_BATTERY_POWER;Real-time clock battery out of power'; break;
    case    26: s='HASP_NO_ACK_SPACE;Acknowledge data requested by update, but ack&nbsp;data parameter is NULL'; break;
    case    27: s='HASP_TS_DETECTED;Program running on a terminal server'; break;
    case    28: s='HASP_FEATURE_TYPE_NOT_IMPL;Requested Feature type not implemented'; break;
    case    29: s='HASP_UNKNOWN_ALG;Unknown algorithm used in H2R/V2C file'; break;
    case    30: s='HASP_INV_SIG;Signature verification operation failed'; break;
    case    31: s='HASP_FEATURE_NOT_FOUND;Requested Feature not available'; break;
    case    32: s='HASP_NO_LOG;Access log not enabled'; break;
    case    33: s='HASP_LOCAL_COMM_ERR;Communication error between API and local Sentinel HASP License Manager'; break;
    case    34: s='HASP_UNKNOWN_VCODE;Vendor Code not recognized by API'; break;
    case    35: s='HASP_INV_SPEC;Invalid XML specification'; break;
    case    36: s='HASP_INV_SCOPE;Invalid XML scope'; break;
    case    37: s='HASP_TOO_MANY_KEYS;Too many Sentinel HASP protection keys match the scope'; break;
    case    38: s='HASP_TOO_MANY_USERS;Too many concurrent user sessions currently connected'; break;
    case    39: s='HASP_BROKEN_SESSION;Session been interrupted'; break;
    case    40: s='HASP_REMOTE_COMM_ERR;Communication error between local and remote Sentinel HASP License Managers'; break;
    case    41: s='HASP_FEATURE_EXPIRED;Feature expired'; break;
    case    42: s='HASP_OLD_LM;Sentinel HASP License Manager version too old'; break;
    case    43: s='HASP_DEVICE_ERR;Input/Output error occurred in secure storage area of HASP SL key OR a USB error occurred when communicating with a HASP HL key'; break;
    case    44: s='HASP_UPDATE_BLOCKED;Update installation not permitted; This update was already applied'; break;
    case    45: s='HASP_TIME_ERR;System time has been tampered with'; break;
    case    46: s='HASP_SCHAN_ERR;Communication error occurred in secure channel'; break;
    case    47: s='HASP_STORAGE_CORRUPT;Corrupt data exists in secure storage area of HASP SL protection key'; break;
    case    48: s='HASP_NO_VLIB;Unable to find Vendor library'; break;
    case    49: s='HASP_INV_VLIB;Unable to load Vendor library'; break;
    case    50: s='HASP_SCOPE_RESULTS_EMPTY;Unable to locate any Feature matching scope'; break;
    case    51: s='HASP_VM_DETECTED;Program running on a virtual machine'; break;
    case    52: s='HASP_HARDWARE_MODIFIED;HASP SL key incompatible with machine hardware; HASP SL key is locked to different hardware. OR: In the case of a V2C file, conflict between HASP SL key data and machine hardware data; HASP SL key locked to different hardware'; break;
    case    53: s='HASP_USER_DENIED;Login denied because of user restrictions'; break;
    case    54: s='HASP_UPDATE_TOO_OLD;Trying to install a V2C file with an update counter that is out of sequence with the update counter on the Sentinel HASP protection key. The update counter value in the V2C file is lower than the value in sentinel HASP protection key.'; break;
    case    55: s='HASP_UPDATE_TOO_NEW;Trying to install a V2C file with an update counter that is out of sequence with update counter in the Sentinel HASP protection key. The first value in the V2C file is greater than the value in the Sentinel HASP protection key.'; break;
    case    56: s='HASP_OLD_VLIB;Vendor library version too old'; break;
    case    57: s='HASP_UPLOAD_ERROR;Upload via ACC failed, e.g. because of illegal format'; break;
    case    58: s='HASP_INV_RECIPIENT;Invalid XML &quot;recipient&quot; parameter'; break;
    case    59: s='HASP_INV_DETACH_ACTION;Invalid XML &quot;action&quot; parameter'; break;
    case    60: s='HASP_TOO_MANY_PRODUCTS;scope does not specify a unique Product'; break;
    case    61: s='HASP_INV_PRODUCT;Invalid Product information'; break;
    case    62: s='HASP_UNKNOWN_RECIPIENT;Unknown Recipient; update can only be applied to the Recipient specified in hasp&nbsp;detach(), and not to this computer'; break;
    case    63: s='HASP_INV_DURATION;Invalid duration'; break;
    case    64: s='HASP_CLONE_DETECTED;Cloned HASP SL secure storage detected'; break;
    case   400: s='HASP_NO_API_DYLIB;API dispatcher: API for this Vendor Code was not found'; break;
    case   401: s='HASP_INV_API_DYLIB;API dispatcher: Unable to load API; DLL possibly corrupt?'; break;
    case   501: s='HASP_INVALID_PARAMETER;Invalid function parameter'; break;
    case   500: s='HASP_INVALID_OBJECT;C++ API: Object incorrectly initialized'; break;
    case   502: s='HASP_ALREADY_LOGGED_IN;C++ API: Logging in twice to the same object'; break;
    case   503: s='HASP_ALREADY_LOGGED_OUT;C++ API: Logging out twice of the same object'; break;
    case   525: s='HASP_OPERATION_FAILED;.NET API: Incorrect use of system or platform'; break;
    case   600: s='HASP_NO_EXTBLOCK;Internal use: no classic memory extension block available'; break;
    case   650: s='HASP_INV_PORT_TYPE;Internal use: invalid port type'; break;
    case   651: s='HASP_INV_PORT;Internal use: invalid port value'; break;
    case   698: s='HASP_NOT_IMPL;Requested function not implemented'; break;
    case   699: s='HASP_INT_ERR;Internal error occurred in API'; break;
  }
  return s;
}

