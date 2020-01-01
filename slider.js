class Slider {
    constructor(elm, delay){
    this.el = document.querySelector(elm);
    this.wrapper = this.el.querySelector(".slider-wrapper");
    this.el.querySelectorAll(".slider-nav a").forEach(el => {this.slide(el);})
    this.slidec = 0;
    this.time = Date.now(); this.newtime = 0;this.delay = delay // timer 
    this.nslide = this.el.querySelectorAll(".slide").length;
    this.status = 1;
    requestAnimationFrame(this.loop) ;
    }
    slide(elm) {
    var self = this;
    elm.addEventListener("click", function (e) {
        e.preventDefault();
        self.slidec = parseInt(this.getAttribute("data-slide"));
        self.setSlide();
    }, false);
    }

    next(){
        if(this.slidec < this.nslide)
        this.slidec++;
        else this.slidec = 1;
        this.setSlide();
    }
    prev(){
        if (this.slidec > 1 )
            this.slidec--;
        else this.slidec = this.nslide;
        this.setSlide();
    }
    setSlide(){
        let currentSlide = this.el.querySelector(".slide:nth-child(" + this.slidec + ")");
        this.wrapper.style.left = "-" + currentSlide.offsetLeft + "px";
        
        let parent = currentSlide.parentNode;
        let caption = currentSlide.querySelector(".caption");
        parent.querySelectorAll(".caption").forEach(el => { if (el !== caption) el.classList.remove("visible"); });
        caption.classList.add("visible");
        this.el.querySelector(".slider-nav").querySelectorAll("a").forEach(el => {
            if (el.getAttribute("data-slide") == this.slidec) el.classList.add("current");
            else el.className = "";
        })

    }
    resStop(){
        this.status = 1 - this.status;
    }
    loop=()=>{
        if(this.newtime < this.time){
            this.newtime = Date.now() + this.delay;
            if(this.status === 1)
            this.next();
        }
        this.time = Date.now();
        requestAnimationFrame(this.loop)
    }
}