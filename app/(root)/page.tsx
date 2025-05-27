import { Button } from '@/components/ui/button'
import { dummyInterviews } from '@/public/constants'
import Image from 'next/image'
import InterviewCard from '@/components/InterviewCard'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div> 
      <section className='card-cta'>
        <div className="flex flex-col gap-6 max-w-lg">
          <h2 className="">
            Get Interview-Ready with Ai-Powered Practice & Feedback
          </h2>
          <p className="">
            Practice coding interviews with AI-powered questions and receive
            instant feedback. Improve your skills and confidence with our
            interactive platform.
          </p>
        <Button asChild className='btn-primary max-sm:w-fill'>
          <Link href="/interview">Start an Interview</Link>
        </Button>
        </div>
        <Image src="/robot.png" alt="Robot" width={400} height={400} className="max-sm:hidden" />
      </section>
      <section className="flex flex-col gap-6 mt-8">
        <h2>Your interviews</h2>
        <div className="interviews-section">
      {dummyInterviews.map((interview)=>(
          <InterviewCard {...interview} key={interview.id}/>
      ))}
        </div>
      </section>
       <section className="flex flex-col gap-6 mt-8">
        <h2>Pick interviews</h2>
        <div className="interviews-section">
      {dummyInterviews.map((interview)=>(
          <InterviewCard {...interview} key={interview.id}/>
      ))}
        </div>
      </section>
    </div>
  )
}

export default page