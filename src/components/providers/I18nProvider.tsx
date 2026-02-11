'use client';

import { NextIntlClientProvider } from 'next-intl';
import { useState, useEffect, createContext, useContext, useCallback } from 'react';

type Locale = 'en' | 'ja';

interface I18nContextType {
    locale: Locale;
    setLocale: (locale: Locale) => void;
}

const I18nContext = createContext<I18nContextType>({
    locale: 'en',
    setLocale: () => { },
});

export const useLocale = () => useContext(I18nContext);

export default function I18nProvider({ children }: { children: React.ReactNode }) {
    const [locale, setLocaleState] = useState<Locale>('en');
    const [messages, setMessages] = useState<Record<string, any> | null>(null);

    const loadMessages = useCallback(async (loc: Locale) => {
        try {
            const msgs = await import(`../../../messages/${loc}.json`);
            setMessages(msgs.default);
        } catch {
            // Fallback to English
            const msgs = await import(`../../../messages/en.json`);
            setMessages(msgs.default);
        }
    }, []);

    useEffect(() => {
        // Read locale from localStorage
        const savedLocale = (typeof window !== 'undefined'
            ? localStorage.getItem('locale') as Locale
            : null) || 'en';
        setLocaleState(savedLocale);
        loadMessages(savedLocale);
    }, [loadMessages]);

    const setLocale = useCallback((newLocale: Locale) => {
        localStorage.setItem('locale', newLocale);
        setLocaleState(newLocale);
        loadMessages(newLocale);
    }, [loadMessages]);

    if (!messages) {
        return null; // Wait for messages to load
    }

    return (
        <I18nContext.Provider value={{ locale, setLocale }}>
            <NextIntlClientProvider locale={locale} messages={messages}>
                {children}
            </NextIntlClientProvider>
        </I18nContext.Provider>
    );
}
