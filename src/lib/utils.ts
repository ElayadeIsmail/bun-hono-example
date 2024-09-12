import { envVars } from '@/config';

export const EXPIRATION_DATE_IN_SEC = '';

export const getSessionExpiration = () => {
	const nowInSec = new Date().getTime() / 1000;
	return new Date(nowInSec + envVars.expirationDateInSec);
};
