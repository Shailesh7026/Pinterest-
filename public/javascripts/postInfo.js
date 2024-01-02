const navDiv = document.querySelector('.comments-nav');
const comments = document.querySelector('.comments-aria');
const arrow = document.querySelector('#arrow');

navDiv.addEventListener('click', ()=>{

  
if(comments.style.opacity == 1){
    comments.style.opacity = 0;
    comments.style.display = 'block';
    arrow.style.rotate = '180deg';
    return;
}

    comments.style.opacity = 1;
    comments.style.display = 'hidden';
    arrow.style.rotate = '0deg';
})


      // Share button
      const shareButton = document.querySelector('.share-visited');
      shareButton.addEventListener('click', () => {
        const currentURL = window.location.href;
        navigator.clipboard.writeText(currentURL)
          .then(() => {
            alert('URL copied to clipboard');
          })
          .catch((error) => {
            console.error('Failed to copy URL to clipboard:', error);
          });
      });
      
      const currentPostImage = document.querySelector('#post-img-visited');
      const currentPostVideo = document.querySelector('#post-video-visited');

      // Download button
      const downloadButton = document.querySelector('.download-visited');
      downloadButton.addEventListener('click', () => {
         
        let fileURL = '';
      
        if (currentPostImage) {
          fileURL = currentPostImage.src;
        } else if (currentPostVideo) {
          fileURL = currentPostVideo.src;
        }
      
        if (fileURL) {
          const link = document.createElement('a');
          link.href = fileURL;
          link.download = fileURL.substring(fileURL.lastIndexOf('/') + 1);
          link.click();
        }
      });



      // post-video mute unmute logic 
      currentPostVideo.addEventListener('click', () => {
        if(currentPostVideo.muted){
          currentPostVideo.muted = false;
          return;
        }
        currentPostVideo.muted = true;
      });
      
      