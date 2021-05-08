import { t } from './Localize'

function formatPrice(value) {
    return t('AED') + " " + value;
}

module.exports = {
    formatPrice
};