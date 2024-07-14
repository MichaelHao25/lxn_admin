import "@wangeditor/editor/dist/css/style.css"; // 引入 css

import env from "@/env";
import getToken from "@/utils/getToken";
import { IDomEditor, IEditorConfig, IToolbarConfig } from "@wangeditor/editor";
import { Editor, Toolbar } from "@wangeditor/editor-for-react";
import { useEffect, useState } from "react";
type InsertFnType = (url: string, alt: string, href: string) => void;
export interface IHtmlEditor {
  value?: string;
  onChange?: (value: string) => {};
  readonly?: boolean;
}
export default (props: IHtmlEditor) => {
  const { value, onChange, readonly = false } = props;

  // editor 实例
  const [editor, setEditor] = useState<IDomEditor | null>(null); // TS 语法
  // const [editor, setEditor] = useState(null)                   // JS 语法

  // 工具栏配置
  const toolbarConfig: Partial<IToolbarConfig> = {}; // TS 语法
  // const toolbarConfig = { }                        // JS 语法
  const token = getToken();
  // 编辑器配置
  const editorConfig: Partial<IEditorConfig> = {
    readOnly: readonly,
    // TS 语法
    // const editorConfig = {                         // JS 语法
    placeholder: "请输入内容...",
    customPaste() {
      return true;
    },
    MENU_CONF: {
      uploadImage: {
        server: `${env.address}/api/v1/upload`,
        fileName: "file",
        headers: {
          [token.key]: token.value,
        },

        // 跨域是否传递 cookie ，默认为 false
        withCredentials: false,
        async customInsert(res: any, insertFn: InsertFnType) {
          const { success, data } = res;
          if (success && data && data?.[0]?.url) {
            insertFn(data?.[0]?.url, "图片", data?.[0]?.url);
          }
        },
      },
      uploadVideo: {
        server: `${env.address}/api/v1/upload`,
        fileName: "file",
        headers: {
          [token.key]: token.value,
        },
        // 跨域是否传递 cookie ，默认为 false
        withCredentials: false,
        async customInsert(res: any, insertFn: InsertFnType) {
          const { success, data } = res;
          if (success && data && data?.[0]?.url) {
            insertFn(data?.[0]?.url, "图片", data?.[0]?.url);
          }
        },
      },
    },
  };

  // 及时销毁 editor ，重要！
  useEffect(() => {
    return () => {
      if (editor == null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);

  return (
    <>
      <div style={{ border: "1px solid #ccc", zIndex: 100 }}>
        <Toolbar
          editor={editor}
          defaultConfig={toolbarConfig}
          mode="default"
          style={{ borderBottom: "1px solid #ccc" }}
        />
        <Editor
          defaultConfig={editorConfig}
          value={value}
          onCreated={setEditor}
          onChange={(editor) => onChange && onChange(editor.getHtml())}
          mode="default"
          style={{ height: "500px", overflowY: "hidden" }}
        />
      </div>
    </>
  );
};
