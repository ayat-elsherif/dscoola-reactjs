import { css } from '@emotion/css';
import { useQueryClient } from '@tanstack/react-query';
import { Button, Col, message, Row } from 'antd';
import useCommentAdd from 'api-hooks/comment/useCommentAdd';
import OwnTextEditor from 'components/own/OwnTextEditor/OwnTextEditor';
import useS3Upload from 'Hooks/utils/useS3Upload';
import useSearchQuery from 'Hooks/utils/useSearchQuery';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { queryKeys } from 'services/react-query/queryKeys';
import { isTextEditorValue } from 'utils';
import UserAvatar from './UserAvatar';

function ReplyItem({ query, type }) {
  const ReplyItemStyles = css`
    padding: 2rem 0;
    .btn-add-reply {
      margin-top: 2rem;
      margin-left: auto;
      font-size: 1.5rem;
    }
  `;
  const { s3Upload } = useS3Upload();
  const { searchQueryObj } = useSearchQuery();
  const client = useQueryClient();
  const { commentAdd, commentAddLod } = useCommentAdd();

  const { currentUser } = useSelector((s) => s?.user);
  const [textEdit, setTextEdit] = useState('');
  const [record, setRecord] = useState(null);

  const [s3Loading, setS3Loading] = useState(false);

  const onAddComment = async () => {
    const comment = isTextEditorValue(textEdit);
    if (!comment && !record?.file)
      return message.warning('Please add your message');

    let file = null;
    if (record?.file) {
      setS3Loading(true);
      file = await s3Upload(record?.file);
      setS3Loading(false);
      console.log('onAddComment  file', file);
    }
    // return;
    const reqData = {
      ...(query ? query : searchQueryObj),
      message: comment,
      voice_url: file,
    };
    if (!reqData?.voice_url) delete reqData?.voice_url;
    if (!reqData?.message) delete reqData?.message;
    commentAdd({
      reqData,
      onSuc: async () => {
        setTextEdit('');
        setRecord(null);

        if (type === 'announcement') {
          client.invalidateQueries([queryKeys.announList]);
        }
      },
    });
  };
  return (
    <div className={ReplyItemStyles}>
      <Row gutter={10} wrap={false}>
        <Col>
          <UserAvatar img={currentUser?.photo_url} />
        </Col>
        <Col flex="auto">
          <OwnTextEditor
            textEdit={textEdit}
            setTextEdit={setTextEdit}
            record={record}
            setRecord={setRecord}
            placeholder="Enter your reply..."
          />
          <Button
            type="primary"
            loading={commentAddLod || s3Loading}
            onClick={onAddComment}
            className="btn-add-reply"
          >
            Add comment
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default ReplyItem;
