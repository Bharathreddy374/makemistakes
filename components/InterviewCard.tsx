import React from 'react'
import dayjs from 'dayjs';
import DisplayTechIcons from './DisplayTechIcons';
import { Button } from './ui/button';
import { getRandomInterviewCover } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
const InterviewCard = ({interviewId,userId,role,type,techstack,createdAt}:InterviewCardProps) => {
    const feedback = null as Feedback | null;
    const normalizedType= /mix/gi.test(type)?'Mixed':type;
    const formattedDate = dayjs(feedback?.createdAt || createdAt || Date.now()).format('MMM D, YYYY');
  return (
    <div className='card-border w-[360px] max-sm:w-full min-h-90'>
        <div className="card-interview">
    <div className="">
        <div className="absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg bg-light-600">
            <p className="badge-text">{normalizedType}</p>
        </div>
        <Image src={getRandomInterviewCover()} alt="Interview Cover" width={90} height={90} className="rounded-full object-fit size-[90]" />
        <h2 className='mt-2'>{role}</h2>
        <div className="flex flex-row gap-5 mt-3 ">
            <div className="flex flex-row gap-2 items-center">
                <Image src="/calendar.svg" alt="Calendar Icon" width={20} height={20} className="size-[22] " />
                <p className="text-sm">{formattedDate}</p>
            </div>
            <div className="flex flex-row gap-2 items-center">
                <Image src="/star.svg" alt="Star Icon" width={20} height={20} className="size-[22] " />
                <p className="text-sm">{feedback?.totalScore || "--"}/100</p>
            </div>
        </div>
        <p className="line-clamp-3 mt-5">{feedback?.finalAssessment || "You havent taken interview yet.take it now to improve Your skills"}</p>
    </div>
    <div className="flex flex-row justify-betwwen">
        <DisplayTechIcons techStack={techstack} />
        <Button className='btn-primary absolute bottom-4 right-4 max-sm:w-fill'>
            <Link href={feedback ? `/interview/${interviewId}/feedback` : `/interview/${interviewId}`}>
                {feedback ? "View Feedback" : "Take Interview"}
            </Link>
        </Button>
    </div>
        </div>
    </div>
  )
}

export default InterviewCard