import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import Link from 'next/link'
import { Separator } from '@/components/ui/separator'
import { Settings } from 'lucide-react'

interface Props {
  menu: any[]
}

const levelStyles: string[] = [
  'text-gray-600 uppercase',
  'text-gray-600 pl-4 font-semibold',
  'text-gray-400 pl-8'
]
export const NavMobile = ({ menu }: Props) => {
  const hasChilds = (childs: any[]) => {
    return childs.length > 0
  }
  const renderMenu = (items: any[], level: number = 0) => {
    return (
      <ul>
        {items.map((item) => (
          <li
            key={item.name || item.title}
            className={cn('flex flex-col gap-y-2 ', {
              'pt-2': !hasChilds(item.childs)
            })}
          >
            {hasChilds(item.childs) ? (
              <Accordion type='single' collapsible>
                <AccordionItem value={item.name! || item.title!}>
                  <AccordionTrigger className={'hover:no-underline py-2'}>
                    <span
                      className={cn('w-full text-left ', levelStyles[level])}
                    >
                      {item.title || item.name}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    {renderMenu(item.childs, level + 1)}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ) : (
              <>
                <Link
                  href={item.url || '#'}
                  className={cn('w-full text-left flex', levelStyles[level])}
                >
                  <Settings className={'size-6 mr-2.5'} />
                  {item.title || item.name}
                </Link>
                {level < 2 && <Separator />}
              </>
            )}
          </li>
        ))}
      </ul>
    )
  }
  return (
    <ScrollArea className={'h-full w-full mt-5 px-4'}>
      <nav className='flex flex-col w-full'>{renderMenu(menu)}</nav>
      <ScrollBar />
    </ScrollArea>
  )
}
