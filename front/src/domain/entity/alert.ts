export type AlertState = {
  severity: AlertSeverity; // alert の種類
  message: string; // alert に対するメッセージ
  open: boolean; // snackbar を表示しているか設定
};

// severity は 'error' か 'success' のどちらか
export type AlertSeverity = 'error' | 'success';
