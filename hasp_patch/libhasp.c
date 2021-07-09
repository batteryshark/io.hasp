// Batman HASP Patch
// Compile (mingw): gcc -shared -m32 -w ./libhasp.c -o ./libhasp.dll
#include <windows.h>
#include <string.h>
#include <stdio.h>
#include <stdlib.h>
// General Defines
#define EXAMPLE_DLL __declspec(dllexport)

static unsigned char hasp_data[32] = {
	0x00 ,0x00 ,0x00 ,0x00 ,0x00 ,0x00 ,0x00 ,0x00,
	0x00 ,0x00 ,0x00 ,0x00 ,0x00 ,0x00 ,0x00 ,0x00,
	0x00 ,0x00 ,0x00 ,0x00 ,0x00 ,0x00 ,0x00 ,0x00,
	0x00 ,0x00 ,0x00 ,0x00 ,0x01 ,0x00 ,0x00 ,0x00
};


void detour_function(void* addr, DWORD new_adr) {
	DWORD OldProtect = 0;
	DWORD Temp = 0;
	int call = (int)(new_adr - (DWORD)addr - 5);
	VirtualProtect(addr, 4096, PAGE_EXECUTE_READWRITE, &OldProtect);
	*((unsigned char*)(addr)) = 0xE9;
	*((int*)((DWORD)addr + 1)) = call;
	VirtualProtect(addr, 4096, OldProtect, &Temp);
}


// Log into hasp dongle.
unsigned int __stdcall hk_hasp_login(int feature_id, void* vendor_code, int* hasp_handle) {
	*hasp_handle = 1337;
	return 0;
}

// Log out of hasp dongle.
unsigned int __stdcall hk_hasp_logout(int hasp_handle) {
	return 0;
}

// Read HASP Data from a file.
unsigned int __stdcall hk_hasp_read(unsigned int hasp_handle, int hasp_fileid, unsigned int offset, unsigned int length, unsigned char* buffer) {
	memcpy(buffer, hasp_data, length);
	return 0;
}

// Write HASP Data from a file.
unsigned int  __stdcall hk_hasp_write(unsigned int hasp_handle, int hasp_fileid, unsigned int offset, unsigned int length, unsigned char* buffer) {
	memcpy(hasp_data, buffer, length);
	return 0;
}

unsigned int hk_generic_retone() {
	return 1;
}


void patch_program() {
	detour_function((void*)0x16F5A39, (DWORD)&hk_hasp_login);
	detour_function((void*)0x16A5C7C, (DWORD)&hk_hasp_logout);
	detour_function((void*)0x16D3C6C, (DWORD)&hk_hasp_write);
	detour_function((void*)0x16E7A74, (DWORD)&hk_hasp_read);
	detour_function((void*)0x1384D80, (DWORD)&hk_generic_retone);
}


HANDLE hMainThread;

void MainThread() {
	patch_program();

}


// Entry-Point
BOOL WINAPI DllMain(HINSTANCE hinstDLL, DWORD fdwReason, LPVOID lpvReserved) {
	if (fdwReason == DLL_PROCESS_ATTACH) {
		hMainThread = CreateThread(NULL, NULL, (LPTHREAD_START_ROUTINE)MainThread, NULL, NULL, NULL);

	}

	return TRUE;
}

// Piggyback Function
void EXAMPLE_DLL fuckstick(void) {}