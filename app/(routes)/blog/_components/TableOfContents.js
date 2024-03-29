'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export function TableOfContents() {
  const [headings, setHeadings] = useState([])
  const [activeHeadingId, setActiveHeadingId] = useState('')

  const constructHref = (linkText) => linkText.toLowerCase().replace(/\s+/g, '-')

  const handleLinkClick = (evt) => {
    evt.preventDefault()

    const targetId = evt.currentTarget.href.replace(/.*\#/, '')
    const targetAnchor = document.getElementById(targetId)

    targetAnchor.scrollIntoView({
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    const headingElements = document.querySelectorAll('h2, h3')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHeadingId(entry.target.id)
          }
        })
      },
      {
        rootMargin: '0% 0% -75% 0%',
      },
    )

    setTimeout(() => {
      headingElements.forEach((element) => {
        observer.observe(element)
      })
    }, 50)

    setHeadings(
      Array.from(headingElements).map((element) => {
        return {
          id: element.id,
          text: element.innerText,
          level: Number(element.nodeName.charAt(1)),
        }
      }),
    )

    return observer.disconnect()
  }, [])

  return (
    <nav className="flex flex-col self-start sticky top-8">
      <p className="text-lg font-bold">Table Of Contents</p>
      <ul className="mt-4">
        {headings.map(({ id, text, level }) => {
          const href = constructHref(text)
          const isLevelTwoHeading = level === 2
          const isActiveHeading = id === activeHeadingId

          return (
            <li
              key={id}
              className={`flex items-center ${isActiveHeading && 'font-bold'} text-sm mt-2 ${
                !isLevelTwoHeading && 'pl-4'
              } first:mt-0 transition-all hover:font-bold`}
            >
              <Link href={`#${href}`} onClick={handleLinkClick}>
                {text}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
