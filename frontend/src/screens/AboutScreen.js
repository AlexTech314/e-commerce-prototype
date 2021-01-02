import React from 'react';

export default function HomeScreen() {

  return (
    <div className="row">
        <div className="inside-view-text">
            <h1>about</h1>
            <p>unsad began as three childhood friends came together to bring their vision of high quality, casual streetwear to life. 
                the brand is designed to promote being happy and doing what you love.</p>
            <p> 
                our hoodies are made with the finest, 100% cotton, french terry cloth.  each logo is stitched to perfection to give our customers a product of the highest quality.  at livefor, we believe every person should do what they love and love what they do.  be happy and do you. 
                we are pursuing our passion. we livefor this.  
            </p>

            <p>Made for you to feel free, together and UnSad</p>
        </div>
        <div className="inside-view-image">
            <img className="about" src="https://unsad-bucket.s3.us-east-2.amazonaws.com/about.jpg" alt="big ass pic"></img>
        </div>
    </div>
  );
}