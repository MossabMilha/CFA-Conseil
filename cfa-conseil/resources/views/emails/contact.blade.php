<div  style="max-width: 600px; margin: 0 auto; background-color: #ffffff; overflow: hidden; border: 1px solid #D1DCED; box-shadow: 4px 4px 0 0 #D1DCED; border-radius: 0.5rem;">
    <div class="header" style="background-color: #f8fafc; color: #252550; padding: 10px 20px; text-align: center; border-bottom: 1px solid #e5e7eb;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
            <h1 style="font-family: 'Inter', sans-serif; font-size: 24px; font-weight: 600;text-align: left;">New Contact Form Submission</h1>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); width: 32px; height: 32px; gap: 0;">
                <div style="background-color: #6886ab; width: 16px; height: 16px; border-radius: 50%; border-top-left-radius: 0;"></div>
                <div style="background-color: #252550; width: 16px; height: 16px; border-radius: 50%; border-top-right-radius: 0;"></div>
                <div style="background-color: #252550; width: 16px; height: 16px; border-radius: 50%; border-bottom-left-radius: 0;"></div>
                <div style="background-color: #6886ab; width: 16px; height: 16px; border-radius: 50%; border-bottom-right-radius: 0;"></div>
            </div>
        </div>
        <p style="font-family: 'Inter', sans-serif; margin: 0; opacity: 0.9; font-size: 14px; text-align: left;">{{ now()->format('F j, Y \a\t g:i A') }}</p>
    </div>
    
    <div class="content" style="padding: 20px;">
        <div style="margin-bottom: 24px;">
            <span style="display: block; font-family: 'Inter', sans-serif; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #6b7280; margin-bottom: 4px;">From</span>
            <div style="display: flex; align-items: center; gap: 8px; font-family: 'Inter', sans-serif; font-size: 16px; font-weight: 500; color: #111827;">{{ $data['name'] }} <span style="sans-serif; color: #252550; background-color: #CEDCED; border: 1px solid #e5e7eb; padding: 2px 4px; border-radius: 6px; font-size: .9em;">{{ $data['email'] }}</span></div>
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px;">
            <div style="margin-bottom: 0;">
                <span style="display: block; font-family: 'Inter', sans-serif; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #6b7280; margin-bottom: 4px;">Phone</span>
                <div style="font-family: 'Inter', sans-serif; font-size: 16px; font-weight: 500; color: #111827;">{{ $data['phone'] }}</div>
            </div>
            <div style="margin-bottom: 0;">
                <span class="field-label" style="display: block; font-family: 'Inter', sans-serif; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #6b7280; margin-bottom: 4px;">Company</span>
                <div class="field-value" style="font-family: 'Inter', sans-serif; font-size: 16px; font-weight: 500; color: #111827;">{{ $data['company'] ?? 'N/A' }}</div>
            </div>
            <div class="field-group" style="margin-bottom: 0;">
                <span class="field-label" style="display: block; font-family: 'Inter', sans-serif; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #6b7280; margin-bottom: 4px;">Position</span>
                <div class="field-value" style="font-family: 'Inter', sans-serif; font-size: 16px; font-weight: 500; color: #111827;">{{ $data['post'] ?? 'N/A' }}</div>
            </div>
            <div class="field-group" style="margin-bottom: 0;">
                <span class="field-label" style="display: block; font-family: 'Inter', sans-serif; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #6b7280; margin-bottom: 4px;">Location</span>
                <div class="field-value" style="font-family: 'Inter', sans-serif; font-size: 16px; font-weight: 500; color: #111827;">{{ $data['city'] }}, {{ $data['country'] }}</div>
            </div>
        </div>

        <div class="field-group" style="margin-bottom: 20px;">
            <span class="field-label" style="display: block; font-family: 'Inter', sans-serif; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #6b7280; margin-bottom: 4px;">Subject</span>
            <div class="field-value" style="background-color: #f8fafc; border: 1px solid #e5e7eb; padding: 8px; border-radius: 6px; font-family: 'Inter', sans-serif; font-size: 16px; font-weight: 500; color: #111827;">{{ $data['subject'] ?? 'No subject' }}</div>
        </div>
        
        <div class="field-group" style="margin-bottom: 0;">
            <span class="field-label" style="display: block; font-family: 'Inter', sans-serif; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #6b7280; margin-bottom: 4px;">Message</span>
            <div class="message-box" style="font-family: 'Inter', sans-serif; font-size: 16px; line-height: 1.6; color: #252550; background-color: #f8fafc; border: 1px solid #e5e7eb; padding: 8px; border-radius: 6px;">{{ $data['message'] }}</div>
        </div>
    </div>
    
    <div class="footer" style="background-color: #f8fafc; padding: 20px 30px; text-align: center; font-family: 'Inter', sans-serif; font-size: 12px; color: #6b7280; border-top: 1px solid #e5e7eb;">
        This email was sent from the contact form on {{ config('app.name', 'Your Application') }}
    </div>
</div>