import { withTranslation } from "react-i18next";


const Constants = {
	DATE_GET_REQUEST_FORMAT: 'DD-MM-YYYY',
	DATE_TIME_FORMAT_ISO: 'dd-MM-yyyy HH:mm:ss',
	DATE_TIME_ISO_FORMAT_PLACEHOLDER: 'dd-mm-rrrr GG:MM:SS',
	DATE_TIME_GG_MM_FORMAT_PLACEHOLDER: 'dd-mm-rrrr GG:MM',
	DATE_TIME_FORMAT: 'DD-MM-YYYY HH:mm:ss',
	DATE_FORMAT: 'DD-MM-YYYY',
	DATE_FORMAT_MONTH: 'MM-YYYY',
	SIMPLE_DATE_FORMAT: 'DD-MM-YYYY',
	BOOLEAN_OPTIONS:[
		{ value: true, label: 'Tak' },
		{ value: false, label: 'Nie' },
	],
	BOOLEAN_OPTIONS_ONLY_TRUE:[
		{ value: true, label: 'Tak' }
	],
	IMAGE_EXTS: '.gif,.jpg,.jpeg,.png',
	SC_MAX_RESULT: 99999,
	IMAGE_MAX_SIZE: 10000000,
	PROTOCOL_REPORT_MAX_SIZE: 100000000,
	SUCCESS_MSG_LIFE: 15000,
	ERROR_MSG_LIFE: 30000,
	monthOpt: [
		{enumValue: 0, label: 'Styczeń'},
		{enumValue: 1, label: 'Luty'},
		{enumValue: 2, label: 'Marzec'},
		{enumValue: 3, label: 'Kwiecień'},		
		{enumValue: 4, label: 'Maj'},
		{enumValue: 5, label: 'Czerwiec'},
		{enumValue: 6, label: 'Lipiec'},
		{enumValue: 7, label: 'Sierpień'},
		{enumValue: 8, label: 'Wrzesień'},
		{enumValue: 9, label: 'Październik'},
		{enumValue: 10, label: 'Listopad'},
		{enumValue: 11, label: 'Grudzień'},
	],
};

export default withTranslation()(Constants);
