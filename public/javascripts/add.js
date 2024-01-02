document.addEventListener('DOMContentLoaded', function () {
  const dragDropArea = document.querySelector('.drag-drop');
  const fileInput = document.querySelector('#file-input');
  const previewImage = document.querySelector('#preview-image');
  const dragDropMessage = document.querySelectorAll('.message-drag-drop');

  // Click event on the drag-and-drop area
  dragDropArea.addEventListener('click', () => {
    fileInput.click();
  });

  fileInput.addEventListener('change', handleFileSelect);

  // Drag events on the drag-and-drop area
  dragDropArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    dragDropArea.classList.add('drag-over');
  });

  dragDropArea.addEventListener('dragleave', () => {
    dragDropArea.classList.remove('drag-over');
  });

  dragDropArea.addEventListener('drop', (e) => {
    e.preventDefault();
    dragDropArea.classList.remove('drag-over');

    const droppedFiles = e.dataTransfer.files;

    if (droppedFiles.length > 0) {
      fileInput.files = droppedFiles;
      handleFileSelect();
    }
  });

  function handleFileSelect() {
    const selectedFile = fileInput.files[0];

    if (selectedFile) {
      const reader = new FileReader();

      reader.onload = function (e) {
        if (selectedFile.type.includes('image')) {
          previewImage.innerHTML = `<img src="${e.target.result}" alt="preview-image">`;
        } else if (selectedFile.type.includes('video')) {
          previewImage.innerHTML = `<video src="${e.target.result}" loop muted autoplay></video>`;
        }

        previewImage.style.display = 'block';

        dragDropMessage.forEach(message => {
          message.style.display = 'none';
        });
      };

      reader.readAsDataURL(selectedFile);
    }
  }
});