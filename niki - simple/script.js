const getRoot = (varName) => {
    return getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
}

const getSpeed = (s) => {
    let res;
    let nums = Number(s.replace(/[^\d\.]*/g,""));
    let units = s.toLowerCase().replace(/[^a-z]/g,"");
    units == "s" ? res = nums*1000 : res = nums;
    return res
}


document.addEventListener("DOMContentLoaded", () => {
    // custom cursor: Cojea Gabriel
    // codepen.io/gabrielcojea/pen/dyGKKXY
    const cursor = document.querySelector('#cursor');
    let mouse = { x: 300, y: 300 };
    let pos = { x: 0, y: 0 };
    const speed = 0.5; // between 0 and 1

    const updatePosition = () => {
        pos.x += (mouse.x - pos.x) * speed;
        pos.y += (mouse.y - pos.y) * speed;
        cursor.style.transform = `translate3d(${pos.x}px ,${pos.y}px, 0)`;
    };

    const updateCoordinates = e => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    }

    window.addEventListener("mousemove", updateCoordinates);

    function loop(){
        updatePosition();
        requestAnimationFrame(loop);
    }

    requestAnimationFrame(loop);

    /*-------------------*/

    let pjBlur = getRoot("--Project-Overlay-Blur");
    if(!(pjBlur == 0 || pjBlur == "0" || pjBlur == "0px")){
        document.body.classList.add("enable-blur")
    }

    /*-------------------*/

    let loading = document.querySelector(".loading_container");
    let loadingText = loading?.querySelector(".loading_text");
    if(loading && loadingText){
        let letter_dur = getSpeed(getRoot("--Loading-Letter-Ani-Speed"));
        let delay_letter = getSpeed(getRoot("--Loading-Letter-Ani-Delay"));
        setTimeout(() => {
            let lt = loadingText.textContent.trim().split("");
            loadingText.replaceChildren();
            loadingText.style.opacity = 1;
            let total_dur = 0;

            for(let i=0; i<lt.length; i++){
                let s = document.createElement("span");

                if(lt[i] === " "){
                    s.innerHTML = "&nbsp;"
                } else {
                    s.textContent = lt[i]
                }

                s.setAttribute("letter",lt[i]);
                
                s.style.animation = `ariseMySon var(--Loading-Letter-Ani-Speed) cubic-bezier(.2,.7,.55,1) calc(var(--Loading-Letter-Ani-Delay) * ${i}) 1 normal forwards`
                loadingText.append(s)

                total_dur = Math.max(total_dur, letter_dur + i * delay_letter);
            }

            setTimeout(() => {
                // alert("animation should be done")
                loadingText.querySelectorAll(":scope > span[letter='.']")?.forEach((z,i) => {
                    z.style.animation = "";
                    z.style.marginTop = "0px"

                    setTimeout(() => {
                        z.style.animation = `dots var(--Loading-Dots-Bounce-Reset) cubic-bezier(.2,.7,.55,1) calc(var(--Loading-Dots-Bounce-Delay) * ${i}) infinite forwards`;
                    }, Math.max(letter_dur, delay_letter))
                    
                })

                setTimeout(() => {
                    loadingText.classList.add("fill");
                    setTimeout(() => {
                        let td = 0;

                        loadingText.querySelectorAll(":scope > span[letter]")?.forEach((z,i) => {
                            z.style.animation = ""
                            z.style.marginTop = "0px"

                            z.style.animation = `fallMySon var(--Loading-Letter-Leave-Speed) cubic-bezier(.2,.7,.55,1) calc(var(--Loading-Letter-Leave-Delay) * ${i}) 1 normal forwards`

                            td = Math.max(td, getSpeed(getRoot("--Loading-Letter-Leave-Speed")) + i * getSpeed(getRoot("--Loading-Letter-Leave-Delay")));
                        })

                        setTimeout(() => {
                            loading.classList.add("remove");
                            setTimeout(() => {
                                loading.remove();
                            },getSpeed(getRoot("--Loading-Screen-FadeOut")))

                            document.querySelectorAll(".scroll-line")?.forEach(s => {
                                s.style.animation = `longue var(--Header-Scroll-Line-Speed) cubic-bezier(.2,.7,.55,1) var(--Header-Scroll-Line-Delay) 1 normal forwards`
                            })
                        },td)
                    },getSpeed(getRoot("--Loaded-Fill-Speed")) - 150);
                },getSpeed(getRoot("--Loading-Screen-Estimated-Removal")))
            }, total_dur)
        },getSpeed(getRoot("--Loading-First-Fade-Delay")))
    }//end: loadingText

    document.querySelectorAll(".moon-icon[color]:not([color=''])")?.forEach(m => {
        if(m.getAttribute("color").trim() !== ""){
            m.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="1000" height="1000" viewBox="0 0 1000 1000" xml:space="preserve"><g transform="matrix(-42.2892 0 0 42.2892 500.0005 500.0005)" id="572231"><path style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; is-custom-font: none; font-file-url: none; fill: ${m.getAttribute("color").trim()}; fill-rule: nonzero; opacity: 1;" vector-effect="non-scaling-stroke" transform=" translate(-12.0014, -12.0025)" d="M 22.231 16.009 c -0.21 -0.337 -0.762 -0.866 -2.083 -0.627 a 8.643 8.643 0 0 1 -1.913 0.131 a 8.567 8.567 0 0 1 -8.191 -8.371 a 8.251 8.251 0 0 1 0.684 -3.342 a 1.792 1.792 0 0 0 -0.151 -2.125 c -0.284 -0.287 -0.946 -0.691 -2.192 -0.167 a 11.078 11.078 0 0 0 -6.791 10.968 a 11.262 11.262 0 0 0 10.673 10.263 c 0.171 0.008 0.341 0.012 0.511 0.012 a 11.251 11.251 0 0 0 9.1 -4.588 c 0.798 -1.088 0.563 -1.816 0.353 -2.154 z m -1.563 1.267 a 9.757 9.757 0 0 1 -17.578 -4.9 a 9.579 9.579 0 0 1 5.877 -9.491 a 1.408 1.408 0 0 1 0.512 -0.133 a 1.36 1.36 0 0 1 -0.127 0.445 a 9.734 9.734 0 0 0 -0.808 3.952 a 10.082 10.082 0 0 0 9.63 9.863 a 10.537 10.537 0 0 0 2.24 -0.153 a 1.545 1.545 0 0 1 0.5 -0.027 a 1.549 1.549 0 0 1 -0.246 0.444 z" stroke-linecap="round"/></g></svg>`
        }
    })

    document.querySelectorAll(".sun-icon[color]:not([color=''])")?.forEach(s => {
        if(s.getAttribute("color").trim() !== ""){
            s.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 32 32" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><g data-name="Layer 2"><path d="M16 9a7 7 0 1 0 7 7 7.008 7.008 0 0 0-7-7zm0 12a5 5 0 1 1 5-5 5.006 5.006 0 0 1-5 5zM16 7a1 1 0 0 0 1-1V3a1 1 0 0 0-2 0v3a1 1 0 0 0 1 1zM16 25a1 1 0 0 0-1 1v3a1 1 0 0 0 2 0v-3a1 1 0 0 0-1-1zM23.071 9.929a1 1 0 0 0 .707-.293L25.9 7.515A1 1 0 1 0 24.485 6.1l-2.121 2.122a1 1 0 0 0 .707 1.707zM8.222 22.364 6.1 24.485A1 1 0 1 0 7.515 25.9l2.121-2.121a1 1 0 1 0-1.414-1.414zM23.778 22.364a1 1 0 1 0-1.414 1.414l2.121 2.122a1 1 0 0 0 1.415-1.415zM8.222 9.636a1 1 0 0 0 1.414-1.414L7.515 6.1A1 1 0 0 0 6.1 7.515zM7 16a1 1 0 0 0-1-1H3a1 1 0 0 0 0 2h3a1 1 0 0 0 1-1zM29 15h-3a1 1 0 0 0 0 2h3a1 1 0 0 0 0-2z" fill="${s.getAttribute("color").trim()}"></path></g></g></svg>`
        }
    })

    let darkMode = document.querySelector(".dark-mode");
    let lightMode = document.querySelector(".light-mode");
    let pan = document.querySelector(".mode-switch-overlay");
    if(darkMode && lightMode && pan){
        darkMode.addEventListener("click", () => {
            darkMode.style.display = "none";
            lightMode.style.display = "block";

            pan.style.display = "block";

            setTimeout(() => {
                pan.classList.add("show");

                setTimeout(() => {
                    document.documentElement.classList.add("html-dark");

                    pan.classList.remove("show");

                    setTimeout(() => {
                        pan.style.display = "none"
                    },getSpeed(getRoot("--Light-Dark-Mode-Switch-Speed")))
                },getSpeed(getRoot("--Light-Dark-Mode-Switch-Speed")))
            },0)
        })

        lightMode.addEventListener("click", () => {
            lightMode.style.display = "none";
            darkMode.style.display = "block";

            pan.style.display = "block";

            setTimeout(() => {
                pan.classList.add("show");

                setTimeout(() => {
                    document.documentElement.classList.remove("html-dark");

                    pan.classList.remove("show");

                    setTimeout(() => {
                        pan.style.display = "none"
                    },getSpeed(getRoot("--Light-Dark-Mode-Switch-Speed")))
                },getSpeed(getRoot("--Light-Dark-Mode-Switch-Speed")))
            },0)
        })
    }

    document.querySelectorAll(".copyright-year")?.forEach(c => {
        c.textContent = new Date().getFullYear();
    })

    let pjIMGs = document.querySelector(".pj-imgs");
    if(pjIMGs){
        pjIMGs.querySelectorAll(":scope > .project-img")?.forEach((proj, i) => {
            // duplicate <img> and set it as the bg img
            proj.querySelectorAll(":scope > img[src]:not([src=''])")?.forEach(img => {
                proj.style.backgroundImage = `url("${img.src}")`
            })

            // add <div class="g"></div> before first instance of .project-img
            if(i == 0){
                let g = document.createElement("div");
                g.classList.add("g");
                proj.before(g);
            }
        })

        pjIMGs.querySelectorAll(".project-overlay")?.forEach(overlay => {
            let ov = document.createElement("div");
            ov.classList.add("overlay-inner");
            overlay.prepend(ov);
            ov.parentNode.querySelectorAll(":scope > *:not(.overlay-inner)")?.forEach(e => {
                ov.append(e)
            })
        })
    }

    // width of slider (including parts that aren't visible)
    // slideshow item index
    document.querySelectorAll(".pj-imgs > .g")?.forEach(g => {
        let imgConts = g.parentNode.querySelectorAll(":scope > .project-img");

        // slideshow container width
        // g.style.width = `${imgConts.length}00%`
        g.style.width = `calc(${imgConts.length} * var(--Project-Width))`

        imgConts?.forEach((cont, i) => {
            g.append(cont);
            cont.setAttribute("img-index",i+1);
        })
    })

    // slider
    let pjContInner = document.querySelector(".pj-cont-inner");
    if(pjContInner){
        pjContInner.setAttribute("prev-img",0)
        pjContInner.setAttribute("current-img",1);
        pjContInner.setAttribute("next-img",2)

        let g = pjContInner.querySelector(".g");
        let arrowPrev = pjContInner.querySelector(".ss-arrow-left");
        let arrowNext = pjContInner.querySelector(".ss-arrow-right");
        if(g && arrowPrev && arrowNext){
            arrowPrev.addEventListener("click", () => {
                let getPrev = parseInt(pjContInner.getAttribute("prev-img"));
                let getIMG = document.querySelector(`.project-img[img-index="${getPrev}"]`);
                if(getIMG){
                    arrowNext.style.display = "flex";

                    // g.style.marginLeft = `calc(0px - ${getPrev-1}00%)`;
                    g.style.marginLeft = `calc(0px - (var(--Project-Width) * ${getPrev-1}))`;
                    pjContInner.setAttribute("prev-img",getPrev-1);
                    pjContInner.setAttribute("current-img",getPrev);
                    pjContInner.setAttribute("next-img",getPrev+1)

                    let checkPrev = document.querySelector(`.project-img[img-index="${getPrev-1}"]`);
                    if(!checkPrev){
                        arrowPrev.style.display = "none"
                    }
                }
            })

            arrowNext.addEventListener("click", () => {
                let getNext = parseInt(pjContInner.getAttribute("next-img"));
                let getIMG = document.querySelector(`.project-img[img-index="${getNext}"]`);
                if(getIMG){
                    arrowPrev.style.display = "flex";

                    // g.style.marginLeft = `calc(0px - ${getNext-1}00%)`;
                    g.style.marginLeft = `calc(0px - (var(--Project-Width) * ${getNext-1}))`;
                    pjContInner.setAttribute("prev-img",getNext-1);
                    pjContInner.setAttribute("current-img",getNext);
                    pjContInner.setAttribute("next-img",getNext+1)

                    let checkNext = document.querySelector(`.project-img[img-index="${getNext+1}"]`);
                    if(!checkNext){
                        arrowNext.style.display = "none"
                    }
                }
            })
        }
    }

    // load project eye
    document.querySelectorAll(".project-eye[color]")?.forEach(e => {
        let color = e.getAttribute("color").trim();
        if(color !== ""){
            e.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 48 48" style="enable-background:new 0 0 512 512" xml:space="preserve" fill-rule="evenodd" class=""><g><path d="M46.288 26.572a5.003 5.003 0 0 0 0-5.144C46.216 21.309 38.8 9 24 9S1.784 21.309 1.712 21.428a5.003 5.003 0 0 0 0 5.144C1.784 26.691 9.2 39 24 39s22.216-12.309 22.288-12.428zm-1.716-1.029-.001.002S37.722 37 24 37 3.429 25.545 3.429 25.545l-.001-.002a2.994 2.994 0 0 1 0-3.086l.001-.002S10.278 11 24 11s20.571 11.455 20.571 11.455l.001.002c.571.95.571 2.136 0 3.086z" fill="${color}" class=""></path><path d="M23.848 14.85c-4.965 0-8.998 4.033-8.998 8.998s4.033 8.998 8.998 8.998 8.998-4.033 8.998-8.998-4.033-8.998-8.998-8.998zm0 2a7 7 0 0 1 6.998 6.998 7 7 0 0 1-6.998 6.998 7 7 0 0 1-6.998-6.998 7 7 0 0 1 6.998-6.998z" fill="${color}" class=""></path></g></svg>`
        }
    })

    // pupil follows cursor: Maria Tatosh
    // codepen.io/masha_tatosh/pen/ExawOpB
    document.querySelectorAll(".eye .pupil")?.forEach(pupil => {
        let eye = pupil.closest(".eye");

        document.addEventListener("mousemove", e => {
            const eyeRect = eye.getBoundingClientRect();

            // center of the eye
            const eyeCenterX = eyeRect.left + eye.offsetWidth / 2;
            const eyeCenterY = eyeRect.top + eye.offsetHeight / 2;
            
            // distance between eye center, mouse cursor
            const deltaX = e.clientX - eyeCenterX;
            const deltaY = e.clientY - eyeCenterY;
            
            // angle from the center --> cursor position
            const angle = Math.atan2(deltaY, deltaX);
            
            // max distance the pupil can move from the center
            const maxDistance = eye.offsetWidth / 2 - pupil.offsetWidth / 2;
            
            // new pupil position
            const pupilX = maxDistance * Math.cos(angle);
            const pupilY = maxDistance * Math.sin(angle);
            
            pupil.style.left = (pupilX + eye.offsetWidth / 2 - pupil.offsetWidth / 2) + "px";
            pupil.style.top = (pupilY + eye.offsetHeight / 2 - pupil.offsetHeight / 2) + "px";
        })
    })
    
    // mobile hamburger menu
    let hamburger = document.querySelector(".menu-trigger");
    let nav = document.querySelector("nav");
    let ul = document.querySelector("nav ul");
    if(hamburger && nav && ul){
        hamburger.addEventListener("click", () => {
            // open menu
            if(!hamburger.matches(".active")){
                hamburger.classList.add("active");
                hamburger.classList.add("active1");

                nav.classList.add("active");
                ul.classList.add("show")
                setTimeout(() => {
                    ul.classList.add("active");
                },50)
                
                setTimeout(() => {
                    hamburger.classList.add("active2")

                    setTimeout(() => {
                        hamburger.classList.add("ani-end")
                    }, getSpeed(getRoot("--Mobile-Menu-Animation-2-Speed")))
                }, getSpeed(getRoot("--Mobile-Menu-Animation-1-Speed")))
            }

            // close menu, but only after initial animation is complete
            else {
                if(hamburger.matches(".ani-end")){
                    hamburger.classList.remove("ani-end");
                    hamburger.classList.remove("active2");

                    ul.classList.remove("active");
                    setTimeout(() => {
                        nav.classList.remove("active")

                        setTimeout(() => {
                            ul.classList.remove("show")
                        }, getSpeed(getRoot("--Mobile-Nav-List-Animation-Speed")))
                    },0)

                    setTimeout(() => {
                        hamburger.classList.remove("active1")

                        setTimeout(() => {
                            hamburger.classList.remove("active")
                        }, getSpeed(getRoot("--Mobile-Menu-Animation-1-Speed")))
                    }, getSpeed(getRoot("--Mobile-Menu-Animation-2-Speed")))
                }
            }

            // detect nav item click --> close menu after autojump
            document.querySelectorAll("nav.active [href^='#']")?.forEach(n => {
                n.addEventListener("click", () => {
                    setTimeout(() => {
                        if(hamburger.matches(".active") && hamburger.matches(".ani-end")){
                            hamburger.click();
                        }
                    }, getSpeed(getRoot("--Mobile-Menu-Animation-2-Speed")))
                })
            })
        })
    }

    // skills graphs area: wrap logo image
    document.querySelectorAll(".skill-left .graph + img")?.forEach(img => {
        let o = document.createElement("div");
        o.classList.add("img-wrap");
        img.before(o);
        o.append(img)
    })

    // skills graphs area: add calendar icon
    document.querySelectorAll(".skill-right .exp")?.forEach(exp => {
        let s = document.createElement("span");
        s.textContent = exp.textContent;
        exp.textContent = ""
        exp.append(s);

        let i = document.createElement("i");
        i.setAttribute("iconsax","");
        i.setAttribute("icon","calendar");
        exp.prepend(i)
    })

    // tooltips
    document.querySelectorAll("[data-title]:not([data-title=''])")?.forEach(title => {
        tippy(title, {
            content: title.getAttribute("data-title"),
            placement: "bottom",
            interactive: true
        });
    })

    // nav menu item: visually remove the #[nav-text] when clicked
    document.querySelectorAll("nav [href^='#'], a.header-scroll[href^='#']")?.forEach(n => {
        n.addEventListener("click", () => {
            setTimeout(() => {
                history.pushState("", document.title, window.location.pathname + window.location.search)
            },0)
        })
    })
})//end DOMContentLoaded

circleGraph({
	selectors: ".skill-item .graph",
	showPercentage: false
})

popify({
	button: ".crds",
	popup_selector: ".popup",
	fade_speed: 400,
	exit_options: {
		exit_button: ".close-popup",
		click_outside_to_exit: true,
		escape_key_to_exit: true
	}
})
