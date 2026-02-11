'use client';

import { useState } from 'react';
import {
    IconButton,
    Menu,
    MenuItem,
    ListItemText,
    Typography,
    Box,
} from '@mui/material';
import { Language } from '@mui/icons-material';
import { useLocale } from '@/components/providers/I18nProvider';

const LOCALES = [
    { code: 'en' as const, label: 'English', flag: '🇺🇸' },
    { code: 'ja' as const, label: '日本語', flag: '🇯🇵' },
];

export default function LanguageSwitcher() {
    const { locale, setLocale } = useLocale();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSelect = (code: 'en' | 'ja') => {
        setLocale(code);
        handleClose();
    };

    const currentLocale = LOCALES.find((l) => l.code === locale) || LOCALES[0];

    return (
        <>
            <IconButton
                onClick={handleOpen}
                size="small"
                sx={{
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 1,
                    px: 1,
                    gap: 0.5,
                }}
            >
                <Typography variant="body2" sx={{ fontSize: '1rem' }}>
                    {currentLocale.flag}
                </Typography>
                <Typography variant="body2" sx={{ fontSize: '0.75rem', fontWeight: 600 }}>
                    {currentLocale.code.toUpperCase()}
                </Typography>
            </IconButton>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                PaperProps={{ sx: { mt: 1, minWidth: 150 } }}
            >
                {LOCALES.map((loc) => (
                    <MenuItem
                        key={loc.code}
                        onClick={() => handleSelect(loc.code)}
                        selected={loc.code === locale}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <Typography sx={{ fontSize: '1.2rem' }}>{loc.flag}</Typography>
                            <ListItemText>{loc.label}</ListItemText>
                        </Box>
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
}
