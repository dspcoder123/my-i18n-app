'use client';

import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import "./custom.css";

type StrapiMedia = {
  url?: string;
  formats?: { [key: string]: { url: string } };
};

type HeaderItemV4 = {
  attributes?: {
    Image?: { data?: { attributes?: StrapiMedia } | Array<{ attributes?: StrapiMedia }> };
    Description?: string;
  };
};

type HeaderItemFlat = {
  Image?: StrapiMedia | { url?: string };
  Description?: string;
};

type StrapiResponse<T> = { data: T[] };

export default function Home() {
  const { i18n, t } = useTranslation('common');
  const [description, setDescription] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const baseUrl = useMemo(() => process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337', []);

  useEffect(() => {
    let cancelled = false;
    const fetchHero = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const url = `${baseUrl}/api/heroes?locale=${i18n.language}&pagination[pageSize]=1&populate=Image`;
        const res = await fetch(url, { next: { revalidate: 60 } });
        if (!res.ok) throw new Error(`Failed to load header (${res.status})`);
        const json: StrapiResponse<HeaderItemV4 & HeaderItemFlat> = await res.json();
        const item = json.data?.[0];
        let desc = "";
        let img: string | undefined;
        if (item) {
          // Try flat shape first
          const flat = item as HeaderItemFlat;
          desc = flat.Description || desc;
          const mediaFlat = flat.Image as unknown;
          if (Array.isArray(mediaFlat)) {
            const first = (mediaFlat[0] as StrapiMedia) || undefined;
            if (first?.url) img = first.url;
          } else {
            const single = (mediaFlat as StrapiMedia) || undefined;
            if (single?.url) img = single.url;
          }

          // Try v4 attributes shape
          const v4 = item as HeaderItemV4;
          const data = v4.attributes?.Image?.data as
            | { attributes?: StrapiMedia }
            | Array<{ attributes?: StrapiMedia }>
            | undefined;
          if (Array.isArray(data)) {
            const m = data[0]?.attributes;
            if (!img) img = m?.formats?.medium?.url || m?.url;
          } else {
            const m = data?.attributes;
            if (!img) img = m?.formats?.medium?.url || m?.url;
          }
          if (!desc) desc = v4.attributes?.Description || desc;
        }
        if (!cancelled) {
          setDescription(desc || "");
          setImageUrl(img ? (img.startsWith('http') ? img : `${baseUrl}${img}`) : "");
        }
      } catch (e: unknown) {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Unknown error');
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };
    fetchHero();
    return () => { cancelled = true; };
  }, [i18n.language, baseUrl]);

  return (
    <div>
      <section
        className="hero"
        style={{
          background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
          padding: '64px 0',
        }}
      >
        <div
          className="container"
          style={{
            maxWidth: 1100,
            margin: '0 auto',
            padding: '0 24px',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '32px',
            alignItems: 'center',
          }}
        >
          <div>
            {imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={imageUrl}
                alt="Hero"
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 16,
                  boxShadow: '0 10px 30px rgba(2, 6, 23, 0.08)',
                  objectFit: 'cover',
                }}
              />
            ) : (
              <div
                style={{
                  width: '100%',
                  aspectRatio: '4/3',
                  background: '#e5e7eb',
                  borderRadius: 16,
                }}
              />
            )}
          </div>
          <div>
            <p
              style={{
                margin: 0,
                fontSize: 18,
                lineHeight: 1.7,
                color: '#4b5563',
              }}
            >
              {isLoading && !description ? t('loading') : (description || '')}
            </p>
            {error ? (
              <p style={{ color: 'crimson', marginTop: 12 }}>{error}</p>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  );
}
