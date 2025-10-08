<h2>New Contact Form Submission</h2>
<p><strong>Name:</strong> {{ $data['name'] }}</p>
<p><strong>Email:</strong> {{ $data['email'] }}</p>
<p><strong>Phone:</strong> {{ $data['phone'] }}</p>
<p><strong>Company:</strong> {{ $data['company'] ?? 'N/A' }}</p>
<p><strong>Position:</strong> {{ $data['post'] ?? 'N/A' }}</p>
<p><strong>Country:</strong> {{ $data['country'] }}</p>
<p><strong>City:</strong> {{ $data['city'] }}</p>
<p><strong>Message:</strong></p>
<p>{{ $data['message'] }}</p>
