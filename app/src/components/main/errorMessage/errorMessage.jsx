/*
 * Copyright 2019 EPAM Systems
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Parser from 'html-react-parser';
import { injectIntl, intlShape } from 'react-intl';
import { COMMON_LOCALE_KEYS } from 'common/constants/localization';
import ErrorIcon from 'common/img/error-inline.svg';
import styles from './errorMessage.scss';

const cx = classNames.bind(styles);

export const ErrorMessage = injectIntl(({ error, intl: { formatMessage } }) => (
  <div className={cx('error-message')}>
    <div className={cx('error-icon')}>{Parser(ErrorIcon)}</div>
    <div className={cx('error-header')}>{formatMessage(COMMON_LOCALE_KEYS.ERROR)}</div>
    <div className={cx('error-text')}>
      {error.name}: {error.message}
    </div>
  </div>
));

ErrorMessage.propTypes = {
  error: PropTypes.shape({
    name: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
  }).isRequired,
  intl: intlShape.isRequired,
};
