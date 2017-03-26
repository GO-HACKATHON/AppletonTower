package tech.titikkoma.cerebro;

import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.SharedPreferences;
import android.view.View;
import android.widget.EditText;

/**
 * Created by aliakbars on 11/20/13.
 */
public class App {

    public static SharedPreferences preferences;

    public static String host = "http://192.168.0.1";
    public static final String CHECK = "/storage/";
    public static final String HOST_KEY = "tech.titikkoma.cerebro";
    public static String url = host + CHECK;

    public static void showServerSettings(Context c) {
        final EditText ipAddressInput = new EditText(c);
        ipAddressInput.setHint("http://192.168.0.1");
        ipAddressInput.setText(App.host);
        new AlertDialog.Builder(c)
                .setTitle("Server")
                .setMessage("URL:")
                .setView(ipAddressInput)
                .setPositiveButton("Save", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialogInterface, int i) {
                        App.host = String.valueOf(ipAddressInput.getText());
                        App.preferences.edit().putString(App.HOST_KEY, App.host).commit();
                        url = App.host + App.CHECK;
                    }
                })
                .setNegativeButton("Cancel", null).show();
    }
}
