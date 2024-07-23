
export const playNotificationSound = () => {
    const audio = new Audio("https://www.z2u.com/notic.wav");
    audio.play().catch((error) => {
        console.error('Error playing audio:', error);
    });
};