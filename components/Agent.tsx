import { cn } from '@/lib/utils';
import Image from 'next/image'
import React from 'react'
enum CallStatus{
    INACTIVE = 'INACTIVE',
    CONNECTING ='CONNECTING',
    ACTIVE = 'ACTIVE',
    FINISHED='FINISHED',
}

const Agent = ({userName}:AgentProps) => {
    const callStatus = CallStatus.FINISHED;
    const messages =[
        'Whats your name?',
        'What is your experience in the field?',
    ];
    const lastMessage = messages[messages.length - 1];
    const isSpeaking = true; // This should be replaced with actual state management logic
  return (
    <>
    
    <div className='call-view'>
        <div className="card-interviewer">
            <div className="avatar">
                <Image src="/ai-avatar.png" alt="vapi" width={65} height={54} className='object-cover' />
                {isSpeaking && <span className='animate-speak'/>}
            </div>
            <h3>AI Interviewer</h3>
        </div>
        <div className="card-border">
            <div className="card-content">
                <Image src="/user-avatar.png" alt="user" width={540} height={540} className='rounded-full object-cover size-[120px]' />
                {/* {isSpeaking && <span className='animate-speak'/>} */}
                            <h3>{userName}You</h3>

            </div>
        </div>
    </div>
        {messages.length > 0 &&(
            <div className="transcipt-border">
                <div className="transcript">
                    <p key={lastMessage} className={cn(
                        'transition-opacity duration-500 opacity-0','animate-fadeIn opacity-100')}>
                    {lastMessage}
                    </p>
                </div>
            </div>
        )}
    <div className="w-full flex justify-center">

            {callStatus !=='ACTIVE'? (
                <button className='relative btn-call'>
                    <span className={cn('absolute animate-ping rounded-full opacity-75',callStatus !== 'CONNECTING'& 'hidden')}/>
                    <span className="">                        {callStatus === 'INACTIVE' || callStatus === 'FINISHED' ? 'Call':'.......'}
                        </span>
                </button>
            ):(
                <button className='btn-disconnect'>
                        End
                </button>
            )}
    </div>
        </>

  )
}

export default Agent