import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Button, message, Upload } from 'antd';

const App: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const props: UploadProps = {
    // A deliberately failing endpoint so the file lands in `error` state
    // and the retry icon shows up for manual testing.
    action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/force-error',
    onChange({ file }) {
      console.log(file);
      if (file.status === 'done') {
        messageApi.success(`${file.name} uploaded successfully`);
      } else if (file.status === 'error') {
        messageApi.error(`${file.name} upload failed. Click the retry icon to retry.`);
      }
    },
    onRetry: (file) => {
      messageApi.info(`Retrying ${file.name}`);
      console.log('retry', file);
    },
    showUploadList: {
      showRetryIcon: true,
    },
  };

  return (
    <>
      {contextHolder}
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>Upload (will fail, then retry)</Button>
      </Upload>
    </>
  );
};

export default App;
