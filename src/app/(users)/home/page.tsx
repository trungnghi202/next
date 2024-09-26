"use client";
import React from "react";
import gsap from "gsap";
import {useEffect} from "react";

interface TeamMember {
    name: string
    role: string
    bio: string
    image: string
}

export default function  HomePage(){
    const teamMembers: TeamMember[] = [
        {
            name: "Saihoong Chan",
            role: "Director",
            bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            image: "/placeholder.svg?height=400&width=400",
        },
        {
            name: "Nguyen Trung Hau",
            role: "CTO",
            bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            image: "/placeholder.svg?height=400&width=400",
        },
    ]


    useEffect(() => {
        const title = document.getElementById("title"); // Lấy element với ID "title"

        if (!title) {
            return;
        }
        const textTitle = 'Meet the team'
        const splitedText = textTitle.split("");
        let cluterr = '';
        splitedText.forEach((e,index) => {
            if(index < (splitedText.length/2)) {
                cluterr += `<span class="a relative">${e}</span>`;
            }else{
                cluterr += `<span class="b relative ">${e}</span>`;
            }
        });
        title.innerHTML = cluterr;
        var tl = gsap.timeline();
        tl.from('#title', {
            opacity: 1,
        });

        tl.from('#title span', {
            y: 30,
            opacity: 0,
            duration: 3,
            delay: .3,
            stagger: .2,
            ease: "power3.out",
        })

    }, []);




    return (
        <>
            <style jsx>{`
        #title {
          opacity: 0; /* Đảm bảo tiêu đề ban đầu ẩn */
        }
        #title span {
          display: inline-block; /* Đảm bảo span là block để di chuyển */
          position: relative; /* Để GSAP có thể áp dụng translate */
        }
      `}</style>
      <section>
        <div className="container">

        </div>
      </section>
    <section className="py-24 px-4 md:px-6 bg-white">

        <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
                <p className="text-sm tracking-widest text-blue-600 mb-4">ABOUT US</p>
                <h2 id="title" className="text-4xl md:text-5xl font-semibold">

                    </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
                    {teamMembers.map((member, index) => (
                        <div key={index} className="flex flex-col items-start">
                            <div className="w-full aspect-square rounded-3xl overflow-hidden mb-6 bg-gray-100">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <h3 className="text-2xl font-semibold text-blue-600 mb-2">
                                {member.name}
                            </h3>
                            <p className="text-gray-600 mb-4">{member.role}</p>
                            <p className="text-gray-600 mb-6">{member.bio}</p>

                        </div>
                    ))}
                </div>
            </div>
        </section>
        </>
    )
}