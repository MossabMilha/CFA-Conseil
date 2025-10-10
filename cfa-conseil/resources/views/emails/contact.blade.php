<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Contact Form Submission</title>
    <style type="text/css">
        /* Client-specific resets */
        body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
        table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
        img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
        
        /* Reset styles */
        body { margin: 0 !important; padding: 0 !important; width: 100% !important; }
        
        /* iOS blue links */
        a[x-apple-data-detectors] {
            color: inherit !important;
            text-decoration: none !important;
            font-size: inherit !important;
            font-family: inherit !important;
            font-weight: inherit !important;
            line-height: inherit !important;
        }
        
        /* Main styles */
        body {
            font-family: Arial, sans-serif;
            color: #111827;
            line-height: 1.6;
        }
        
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border: 1px solid #D1DCED;
            border-radius: 0.5rem;
            overflow: hidden;
        }
        
        .header {
            background-color: #f8fafc;
            color: #252550;
            padding: 10px 20px;
            border-bottom: 1px solid #e5e7eb;
        }
        
        .header h1 {
            font-size: 24px;
            font-weight: 600;
            margin: 0;
            text-align: left;
        }
        
        .header p {
            margin: 5px 0 0 0;
            opacity: 0.9;
            font-size: 14px;
            text-align: left;
        }
        
        .content {
            padding: 20px;
        }
        
        .field-group {
            margin-bottom: 20px;
        }
        
        .field-label {
            display: block;
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            color: #6b7280;
            margin-bottom: 4px;
        }
        
        .field-value {
            font-size: 16px;
            font-weight: 500;
            color: #111827;
        }
        
        .message-box {
            background-color: #f8fafc;
            border: 1px solid #e5e7eb;
            padding: 12px;
            border-radius: 6px;
            line-height: 1.6;
        }
        
        .logo-container {
            width: 32px;
            height: 32px;
        }
        
        .logo-square {
            width: 16px;
            height: 16px;
            float: left;
        }
        
        .bg-blue-1 { background-color: #6886ab; }
        .bg-blue-2 { background-color: #252550; }
        
        .email-badge {
            color: #252550;
            background-color: #CEDCED;
            border: 1px solid #e5e7eb;
            padding: 2px 8px;
            border-radius: 6px;
            font-size: 14px;
            display: inline-block;
            margin-left: 8px;
        }
    </style>
</head>
<body style="margin: 0; padding: 32px 0; background-color: #f3f4f6;">
    <!-- Email wrapper -->
    <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
            <td align="center" valign="top">
                <table class="email-container" border="0" cellpadding="0" cellspacing="0" width="600">
                    <!-- Header -->
                    <tr>
                        <td class="header" style="padding: 20px;">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td>
                                        <h1 style="margin: 0; font-size: 24px; font-weight: 600; color: #252550; text-align: left;">New Contact Form Submission</h1>
                                    </td>
                                    <td align="right" valign="top">
                                        <div class="logo-container">
                                            <div class="logo-square bg-blue-1" style="border-radius: 100%; border-top-left-radius: 0;"></div>
                                            <div class="logo-square bg-blue-2" style="border-radius: 100%; border-top-right-radius: 0;"></div>
                                            <div class="logo-square bg-blue-2" style="border-radius: 100%; border-bottom-left-radius: 0;"></div>
                                            <div class="logo-square bg-blue-1" style="border-radius: 100%; border-bottom-right-radius: 0;"></div>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                            <p style="margin: 10px 0 0 0; font-size: 14px; color: #6b7280; text-align: left;">
                                {{ now()->format('F j, Y \a\t g:i A') }}
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td class="content" style="padding: 20px;">
                            <!-- Sender Info -->
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td class="field-group" style="padding-bottom: 20px;">
                                        <span class="field-label">From</span>
                                        <div style="font-size: 16px; margin-top: 4px;">
                                            {{ $data['name'] }}
                                            <span class="email-badge">{{ $data['email'] }}</span>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Contact Details -->
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 24px;">
                                <tr>
                                    <td width="50%" valign="top" style="padding-bottom: 16px; padding-right: 8px;">
                                        <span class="field-label">Phone</span>
                                        <div class="field-value">{{ $data['phone'] }}</div>
                                    </td>
                                    <td width="50%" valign="top" style="padding-bottom: 16px; padding-left: 8px;">
                                        <span class="field-label">Company</span>
                                        <div class="field-value">{{ $data['company'] ?? 'N/A' }}</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td width="50%" valign="top" style="padding-right: 8px;">
                                        <span class="field-label">Position</span>
                                        <div class="field-value">{{ $data['post'] ?? 'N/A' }}</div>
                                    </td>
                                    <td width="50%" valign="top" style="padding-left: 8px;">
                                        <span class="field-label">Location</span>
                                        <div class="field-value">{{ $data['city'] }}, {{ $data['country'] }}</div>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Subject -->
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 20px;">
                                <tr>
                                    <td class="field-group">
                                        <span class="field-label">Subject</span>
                                        <div class="message-box" style="margin-top: 4px;">
                                            {{ $data['subject'] ?? 'No subject' }}
                                        </div>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Message -->
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td class="field-group" style="padding-bottom: 0;">
                                        <span class="field-label">Message</span>
                                        <div class="message-box" style="margin-top: 4px;">
                                            {{ $data['message'] }}
                                        </div>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Footer -->
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 30px; border-top: 1px solid #e5e7eb;">
                                <tr>
                                    <td style="padding: 20px 0; text-align: center; font-size: 12px; color: #6b7280; font-family: Arial, sans-serif;">
                                        This email was sent from the contact form on {{ config('app.name', 'Your Application') }}
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>