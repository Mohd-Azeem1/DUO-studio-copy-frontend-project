function smoothScroll(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}

smoothScroll()

var crsr = document.querySelector("#cursor")
let main = document.querySelector("#main")
let video = document.querySelector("#page1 video")
var hiden= document.querySelector("#hidden")
function cursor(){
    document.addEventListener("mousemove",function (dets){
        gsap.to(crsr,{
            left: dets.x,
            top: dets.y,
            duration: 0.3
        })
    })
    video.addEventListener("mouseenter",()=>{
        gsap.to(crsr,{
            width: "100px"
        })
        crsr.innerHTML= "Lamborghini"
    })
    video.addEventListener("mouseleave",()=>{
        gsap.to(crsr,{
            width: "20px"
        })
        crsr.innerHTML= ""
    })
}
let boxes = document.querySelectorAll(".box")
boxes.forEach(function(elem){
    var att= elem.getAttribute("data-image")
    elem.addEventListener("mouseenter",()=>{
        crsr.style.height = "180px"
        crsr.style.width = "200px"
        crsr.style.backgroundImage = `url(${att})`
        crsr.style.borderRadius = "0"
    })
    elem.addEventListener("mouseleave",()=>{
        crsr.style.height = "20px"
        crsr.style.width = "20px"
        crsr.style.backgroundImage = `none`
        crsr.style.borderRadius = "10px"
    })
})

var navH4 = document.querySelectorAll(".nav-h4")
navH4.forEach(function(elem){
    elem.addEventListener("mouseenter",()=>{
        var hContent=document.createElement("h1")
        hContent.setAttribute("id","hcon")
        hiden.appendChild(hContent)
        hContent.textContent = elem.textContent
        hContent.textContent += "  " +elem.textContent
        hContent.textContent += "  " +elem.textContent
        hContent.textContent += "  " +elem.textContent
        hContent.textContent += "  " +elem.textContent
        hiden.style.display = "block"
        gsap.from("#hidden",{
            scale: 0.7,
            duration: 0.2,
        })
    })
    elem.addEventListener("mouseleave",()=>{
        document.querySelector("#hcon").remove()
        hiden.style.display = "none"
       
    })

})


cursor()
var tl = gsap.timeline({
    scrollTrigger:{
        trigger: "#page1 h2",
        scroller: "#main",
        start: "top 40%",
        end: "top 0",
        scrub: 3,
    }
})
var tl2 = gsap.timeline({
    scrollTrigger:{
        trigger: "#page2",
        scroller: "#main",
        // markers: true,
        start: "top 80%",
        end: "top 20%",
        scrub: 3,
    }
})
var tl3 = gsap.timeline({
    scrollTrigger:{
        trigger: "#page4",
        scroller: "#main",
        // markers: true,
        start: "top 80%",
        end: "top 20%",
        scrub: 3,
    }
})

tl.to("#page1 h1",{
    x: -100,
},'inme')

tl.to("#page1 h2",{
    x: 100,
},'inme')

tl.to("#page1 video",{
    width: "90%",
},'inme')

tl2.to('#main',{
    backgroundColor: "#fff"
})

tl3.to("#main",{
    backgroundColor: '#0F0D0D',
})