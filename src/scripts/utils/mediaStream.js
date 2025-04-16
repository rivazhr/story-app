let stream;

export async function startCamera(videoElement) {
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: { ideal: "environment" }
      }
    });
    videoElement.srcObject = stream;
    await videoElement.play();
  } catch (error) {
    console.error('Camera error:', error);
    alert('Failed to access the camera.');
  }
}

export function stopCamera(videoElement) {
  if (stream) {
    const tracks = stream.getTracks();
    tracks.forEach(track => track.stop());
    videoElement.srcObject = null;
  }
}

export function captureImage(videoElement, canvasElement) {
  const context = canvasElement.getContext('2d');
  canvasElement.width = videoElement.videoWidth;
  canvasElement.height = videoElement.videoHeight;
  context.drawImage(videoElement, 0, 0);
  return new Promise(resolve => {
    canvasElement.toBlob(blob => resolve(blob), 'image/jpeg');
  });
}