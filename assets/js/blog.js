async function loadBlogList() {
    try {
        // Add a timestamp query parameter to prevent caching
        const url = new URL('https://broimluna.github.io/assets/blog.json', window.location.origin);
        url.searchParams.set('t', Date.now());
        
        const response = await fetch(url, {
            cache: 'no-store' // Explicitly disable caching
        });
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const jsonData = await response.json();
        const blogList = document.getElementById('bloglist');
        blogList.innerHTML = ''; // Clear existing content

        jsonData.posts.forEach(post => {
            const postDiv = document.createElement('div');
            postDiv.className = 'post';

            const blogProfileDiv = document.createElement('div');
            blogProfileDiv.className = 'blogprofile';

            const pfpImg = document.createElement('img');
            pfpImg.className = 'blogpfp';
            pfpImg.src = post.blogprofile.pfp.src;
            pfpImg.alt = post.blogprofile.pfp.alt;
            pfpImg.height = post.blogprofile.pfp.height;
            pfpImg.width = post.blogprofile.pfp.width;

            const usernameStrong = document.createElement('strong');
            usernameStrong.className = 'blogusername';
            usernameStrong.textContent = post.blogprofile.username;

            const br = document.createElement('br');

            const timestampSmall = document.createElement('small');
            timestampSmall.className = 'timestamp';
            timestampSmall.textContent = post.blogprofile.timestamp;

            blogProfileDiv.appendChild(pfpImg);
            blogProfileDiv.appendChild(usernameStrong);
            blogProfileDiv.appendChild(br);
            blogProfileDiv.appendChild(timestampSmall);

            const contentLink = document.createElement('a');
            contentLink.className = 'postContent';
            contentLink.textContent = post.postContent;

            postDiv.appendChild(blogProfileDiv);
            postDiv.appendChild(contentLink);

            blogList.appendChild(postDiv);
        });
    } catch (error) {
        console.error('Error fetching or parsing JSON:', error);
        const blogList = document.getElementById('bloglist');
        blogList.innerHTML = '<p>Error loading blog posts. Please try again later.</p>';
    }
}
