import {generateText} from 'ai';
import {google} from '@ai-sdk/google';
import { getRandomInterviewCover } from '@/lib/utils';
import { db } from '@/firebase/admin';

export async function GET(){
    return Response.json({
        success:true,
        data:'THANKYOU!'},
        {
            status: 200,
        });
}

export async function POST(request: Request) {
    const { type,role,level,techstack,amount,userid} = await request.json();

    try{
        const {text: questions }= await generateText({
            model : google('gemini-2.0-flash-001'),
            prompt: `prepare question for a job Interview.
            the job role is ${role}.
            the job experience level is ${level}.
            the job tech stack is ${techstack}.
            the number of questions to be generated is ${amount}.
            the focus between behavioural and technical questions should lean towards :${type}.
            please return only questions ,without any additional text.
            the questions are going to be read by voice assistent so do not use "/" or any other special characters.
            return the questions in a numbered list format like:
            ["question 1",
            "question 2",
            "question 3",]
            

            Thank you! <3
            
            
            
            `
        });
        const interview ={
            role,type,level,techstack:techstack.split(','),
            questions: JSON.parse(questions),
            userId: userid,
            finalized:true,
            coverImage: getRandomInterviewCover(),
            createdAt: new Date().toISOString(),
        }
        await db.collection("interviews").add(interview); 
        return Response.json({
            success: true,
            data: interview,
        }, {
            status: 200,
        });

    } catch (error) {
        console.error('Error in POST request:', error);
        return Response.json({
            success: false,
            error: 'An error occurred while processing your request.'
        }, {
            status: 500,
        });
    }
}