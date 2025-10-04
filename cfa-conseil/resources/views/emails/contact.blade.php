<h2>New Contact Form Submission</h2>
<p><strong>Name:</strong> {{ $data['nom_complet'] }}</p>
<p><strong>Email:</strong> {{ $data['email'] }}</p>
<p><strong>Phone:</strong> {{ $data['Telephone'] }}</p>
<p><strong>Company:</strong> {{ $data['Société'] ?? 'N/A' }}</p>
<p><strong>Position:</strong> {{ $data['Poste'] ?? 'N/A' }}</p>
<p><strong>Country:</strong> {{ $data['Pays'] }}</p>
<p><strong>City:</strong> {{ $data['Ville'] }}</p>
<p><strong>Message:</strong></p>
<p>{{ $data['Message'] }}</p>
