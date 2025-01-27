import React from 'react';

const Loading = () => {
    return (
        <div className='min-h-[calc(100vh-531px)] flex justify-center items-center'>
            <span className="loading w-[70px] loading-spinner text-success  flex items-center min-h-screen"></span>
        </div>
    );
};

export default Loading;