import React from 'react';

const LoadingComponent = () => {
	return (
		<div className="text-center">
			{/* <img
				style={{margin: 'auto'}}
				src="https://firebasestorage.googleapis.com/v0/b/wordsandcode-7e6e0.appspot.com/o/assets%2Floading.gif?alt=media&token=eb654edc-f8d0-4d00-8938-591b97340ed2"
				alt=""/> */}
			<h4
				style={{
          color: '#696969',
          fontFamily: `'Noto Sans', sans-serif`,
				}}
				className="text-center">Loading...</h4>
		</div>
	)
}

export default LoadingComponent;
