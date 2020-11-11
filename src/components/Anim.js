import React, { useEffect, useRef } from 'react'
import "./anim.css"
import useWebAnimations from "@wellyshen/use-web-animations";

const Anim = () => {
    var sceneryFrames =   [
        { transform: 'translateX(100%)' },
        { transform: 'translateX(-100%)' }   
      ];
      
      var sceneryTimingBackground = {
        duration: 36000,
        iterations: Infinity
      };
      
      var sceneryTimingForeground = {
        duration: 12000,
        iterations: Infinity
      };
    
      const { ref: bg1, getAnimation:bgAnim1 } = useWebAnimations({
        keyframes: sceneryFrames,
        timing: sceneryTimingBackground,
      });
      
      const { ref: bg2, getAnimation:bgAnim2 } = useWebAnimations({
        keyframes: sceneryFrames,
        timing: sceneryTimingBackground,
      });
      
      
      const { ref: fg1, getAnimation:fgAnim1 } = useWebAnimations({
        keyframes: sceneryFrames,
        timing: sceneryTimingForeground,
      });
    
      const { ref: fg2, getAnimation:fgAnim2 } = useWebAnimations({
        keyframes: sceneryFrames,
        timing: sceneryTimingForeground,
      });
    
      var spriteFrames = [
        { transform: 'translateY(0)' },
        { transform: 'translateY(-100%)' }   
      ];
    
      const { ref: redQueen, getAnimation:redQueenAnim } = useWebAnimations({
        keyframes: spriteFrames,
        timing: {
          easing: 'steps(7, end)',
          direction: "reverse",
          duration: 600,
          playbackRate: 1,
          iterations: Infinity
        },
      });
    
      var sceneries = [fgAnim1, fgAnim2, bgAnim1, bgAnim2];
      
      var adjustBackgroundPlayback = function() {
        if (redQueenAnim().playbackRate < .8) {
          sceneries.forEach(function(anim) {
            anim().playbackRate = redQueenAnim().playbackRate/2 * -1;
          });
        } else if (redQueenAnim().playbackRate > 1.2) {
          sceneries.forEach(function(anim) {
            anim().playbackRate = redQueenAnim().playbackRate/2;
          });
        } else {
          sceneries.forEach(function(anim) {
            anim().playbackRate = 0;    
          });
        }   
      }
      
      setInterval(adjustBackgroundPlayback, 4000)
    
      setInterval( function() {
        /* Set decay */
        if (redQueenAnim.playbackRate > .4) {
          redQueenAnim.playbackRate *= .9;    
        } 
        adjustBackgroundPlayback();
      }, 3000);

      var goFaster = function() {
        /* But you can speed them up by giving the screen a click or a tap. */
        redQueenAnim().playbackRate *= 1.1;
        adjustBackgroundPlayback();
      }
      
      useEffect(() => {
        document.addEventListener("click", goFaster);
        document.addEventListener("touchstart", goFaster);
      }, [])
  
      

    return (
        <div className="wrapper" >
            <div className="sky"></div>
            <div className="earth">
                <div  id="red-queen_and_alice">
                <img  ref={redQueen} id="red-queen_and_alice_sprite" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/sprite_running-alice-queen_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/sprite_running-alice-queen.png 2x" alt="Alice and the Red Queen running to stay in place." />
                </div>
            </div>

            <div className="scenery" ref={fg1} id="foreground1">
                <img id="palm3" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm3_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm3.png 2x" alt=" " />
            </div>
            <div className="scenery" ref={fg2} id="foreground2">    
                <img id="bush" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/bush_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/bush.png 2x" alt=" " />
                <img id="w_rook_upright" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/w_rook_upright_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/w_rook_upright.png 2x" alt=" " />
            </div>
            <div className="scenery" ref={bg1} id="background1">
                <img id="r_pawn_upright" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_pawn_upright_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_pawn_upright.png 2x" alt=" " />
                <img id="w_rook" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/w_rook_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/w_rook.png 2x" alt=" " />
                <img id="palm1" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm1_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm1.png 2x" alt=" " />
            </div>
            <div className="scenery" ref={bg2} id="background2">
                <img id="r_pawn" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_pawn_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_pawn.png 2x" alt=" " />

                <img id="r_knight" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_knight_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_knight.png 2x" alt=" " />
                <img id="palm2" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm2_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm2.png 2x" alt=" " />
            </div>
        </div>
    )
}

export default Anim