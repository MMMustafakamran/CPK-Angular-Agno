param(
    [Parameter(Mandatory=$true)]
    [string]$Target
)

$csharp = @"
using System;
using System.Text;
using System.Runtime.InteropServices;

public class Win32Helper {
    public delegate bool EnumWindowsProc(IntPtr hWnd, IntPtr lParam);
    [DllImport("user32.dll")] public static extern bool EnumWindows(EnumWindowsProc lpEnumFunc, IntPtr lParam);
    [DllImport("user32.dll")] public static extern int GetWindowText(IntPtr hWnd, StringBuilder lpString, int nMaxCount);
    [DllImport("user32.dll")] public static extern int GetWindowTextLength(IntPtr hWnd);
    [DllImport("user32.dll")] public static extern bool IsWindowVisible(IntPtr hWnd);
    [DllImport("user32.dll")] public static extern bool SetForegroundWindow(IntPtr hWnd);
    [DllImport("user32.dll")] public static extern bool ShowWindowAsync(IntPtr hWnd, int nCmdShow);
    [DllImport("user32.dll")] public static extern uint GetWindowThreadProcessId(IntPtr hWnd, out uint lpdwProcessId);

    public static bool FocusWindowBySubstring(string pattern) {
        IntPtr foundHwnd = IntPtr.Zero;
        EnumWindows((hWnd, lParam) => {
            if (IsWindowVisible(hWnd)) {
                int length = GetWindowTextLength(hWnd);
                if (length > 0) {
                    StringBuilder sb = new StringBuilder(length + 1);
                    GetWindowText(hWnd, sb, sb.Capacity);
                    string title = sb.ToString();
                    if (title.IndexOf(pattern, StringComparison.OrdinalIgnoreCase) >= 0) {
                        foundHwnd = hWnd;
                        return false; // stop enumeration
                    }
                }
            }
            return true;
        }, IntPtr.Zero);

        if (foundHwnd != IntPtr.Zero) {
            ShowWindowAsync(foundHwnd, 3); // 3 = SW_MAXIMIZE, 9 = SW_RESTORE
            SetForegroundWindow(foundHwnd);
            return true;
        }
        return false;
    }
}
"@

Add-Type -TypeDefinition $csharp -ErrorAction SilentlyContinue

$res = [Win32Helper]::FocusWindowBySubstring($Target)
if ($res) {
    Write-Host "Successfully focused window containing: $Target"
} else {
    Write-Warning "Could not find visible window containing: $Target"
}
