<script>
</script>
<div class="min-h-screen flex">
	<div class="w-1/2 flex items-center justify-center bg-white p-8">
	  <div class="w-full max-w-md">
		<div class="flex justify-center mb-8">
		  <svg
			class="w-12 h-12"
			fill="none"
			height="24"
			stroke="currentColor"
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="2"
			viewBox="0 0 24 24"
			width="24"
			xmlns="http://www.w3.org/2000/svg"
		  >
			<path d="M17.5 5.5C19 7 20.5 9 21 11c-2.5.5-5 .5-8.5-1" />
			<path d="M5.5 17.5C7 19 9 20.5 11 21c.5-2.5.5-5-1-8.5" />
			<path d="M16.5 11.5c1 2 1 3.5 1 6-2.5 0-4 0-6-1" />
			<path d="M20 11.5c1 1.5 2 3.5 2 4.5-1.5.5-3 0-4.5-.5" />
			<path d="M11.5 20c1.5 1 3.5 2 4.5 2 .5-1.5 0-3-.5-4.5" />
			<path d="M20.5 16.5c1 2 1.5 3 .5 4.5-2-.5-3-1-4.5-2.5" />
			<path d="M4.783 4.782C8.493 1.072 14.5 1 18 5c-1 1-4.5 2-7.5 1.5" />
		  </svg>
		</div>
		<slot/>
	  </div>
	</div>

	<!-- Cover Image Column -->
	<div class="w-1/2 bg-gray-200">
	  <img
		src="https://placehold.co/1280x1080"
		alt="Cover"
		class="w-full h-full object-cover"
	  />
	</div>
  </div>