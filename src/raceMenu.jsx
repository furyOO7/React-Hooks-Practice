import React from 'react';
import './raceMenu.css'
const Racemenu = (props) => {
    let allref=[]
    console.log(props);
    function animateBtn(SNIPPET,i) {
        allref['ref'+i].classList.add('active')
        setTimeout(() => {
            allref['ref'+i].classList.remove('active')
        },4500)
    }
    function danceBtn(SNIPPET,i){
        allref['ref' + i].style.position = 'absolute'
       allref['ref' + i].style.top = Math.random() * window.innerHeight+ 'px'
       allref['ref' + i].style.left = Math.random() * window.innerWidth + 'px'
        
    }
    return ( <div>
      { props.snippetdata.map((SNIPPET, index) => (
          <button ref={ref => {allref['ref'+index]= ref }} key={index} onClick={(e) => animateBtn(SNIPPET,index)}
          onMouseOver={(e) => danceBtn(SNIPPET,index)}
          >
            {SNIPPET.substring(0, 10)}...
          </button>
        ))}
    </div> );
}
 
export default Racemenu;