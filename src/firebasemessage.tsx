import React, { useEffect } from 'react';
import {useQueryClient } from "@tanstack/react-query";

const FirebaseMessagingComponent = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data && event.data.type === 'BACKGROUND_MESSAGE') {
        console.log('Received background message in React:', event.data.payload);
        // Trigger refetch based on the message
        // You can add logic here to determine which queries to refetch
        // queryClient.invalidateQueries()
    }
    };

    // Add the event listener
    navigator.serviceWorker.addEventListener('message', handleMessage);

    // Clean up the event listener
    return () => {
      navigator.serviceWorker.removeEventListener('message', handleMessage);
    };
  }, [queryClient]);

  return null; // This component doesn't render anything
};

export default FirebaseMessagingComponent;