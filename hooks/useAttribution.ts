'use client'

import { useEffect, useState } from 'react'

export interface AttributionData {
  rep: string | null
  leadSource: string
  demoUrl: string
}

export function useAttribution(): AttributionData {
  const [attribution, setAttribution] = useState<AttributionData>({
    rep: null,
    leadSource: 'rep-landing',
    demoUrl: 'https://cal.com/your-keel-link-here',
  })

  useEffect(() => {
    if (typeof window === 'undefined') return

    const params = new URLSearchParams(window.location.search)
    const rep = params.get('rep')
    
    // Build lead source
    let leadSource = 'rep-landing'
    if (rep) {
      leadSource = `rep-landing - ${rep}`
    }

    // Build demo URL with query params
    const demoBaseUrl = 'https://cal.com/your-keel-link-here'
    const demoParams = new URLSearchParams()
    
    // Preserve existing rep param
    if (rep) {
      demoParams.set('rep', rep)
    }
    
    // Add UTM params
    demoParams.set('utm_source', 'rep-landing')
    demoParams.set('utm_medium', 'partner')
    
    // Preserve other existing UTM params if present
    const existingUtmCampaign = params.get('utm_campaign')
    if (existingUtmCampaign) {
      demoParams.set('utm_campaign', existingUtmCampaign)
    }
    
    const existingUtmContent = params.get('utm_content')
    if (existingUtmContent) {
      demoParams.set('utm_content', existingUtmContent)
    }

    const demoUrl = `${demoBaseUrl}?${demoParams.toString()}`

    setAttribution({
      rep,
      leadSource,
      demoUrl,
    })
  }, [])

  return attribution
}

