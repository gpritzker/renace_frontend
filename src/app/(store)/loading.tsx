import {Skeleton} from '@/components/ui/skeleton'

export default function Loading(){
    return <>
        <div className="w-full h-full flex-1 flex flex-col space-y-4">
            <Skeleton className="w-full h-[390px] rounded-lg bg-gray-200 " />
            <div className="grid grid-cols-2 gap-4 w-full">
                <Skeleton className="w-full h-[200px] rounded-lg bg-gray-200  col-span-1" />
                <Skeleton className="w-full h-[200px] rounded-lg bg-gray-200  col-span-1" />
            </div>
            <div className="grid grid-cols-5 gap-4 w-full">
                <Skeleton className="w-full h-[480px] rounded-lg bg-gray-200  col-span-1" />
                <Skeleton className="w-full h-[480px] rounded-lg bg-gray-200  col-span-1" />
                <Skeleton className="w-full h-[480px] rounded-lg bg-gray-200  col-span-1" />
                <Skeleton className="w-full h-[480px] rounded-lg bg-gray-200  col-span-1" />
                <Skeleton className="w-full h-[480px] rounded-lg bg-gray-200  col-span-1" />
            </div>
        </div>
    </>
}
