
import { useNavigate, useParams } from 'react-router-dom'
import ImagesSection from '../components/ImagesSection'
import { projects } from '../lib/projects'
import { AudioWaveform } from 'lucide-react'
import { useEffect } from 'react'
import HeroProjectSection from '../components/HeroProjectSection'

export default function ProjectPage() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const project = projects.find(p => p.slug === slug);

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    if (!project) {
        return <div>Project not found</div>
    }

    return (
        <>
        <div className='relative max-w-5xl mx-auto'>
            <div className='absolute -left-16 top-6'>
                <button 
                    className='text-white hover:text-white/40 transition-colors'
                    onClick={() => navigate(-1)}
                >
                    <AudioWaveform />
                </button>
            </div>
        </div>
        
        <main className="max-w-5xl mx-auto my-16">
            <h1 className="text-7xl text-white font-clash pb-5">
                {project.titleD}
            </h1>
            
            <ImagesSection />
            
            <HeroProjectSection />

        </main>
        </>
    )
}