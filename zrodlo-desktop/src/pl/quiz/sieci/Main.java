package pl.quiz.sieci;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpServer;

import javax.swing.*;
import java.awt.*;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.InetAddress;
import java.net.InetSocketAddress;
import java.net.URI;
import java.util.HashMap;
import java.util.Map;

/** Quiz „Sieci komputerowe” – uruchamia lokalny serwer i otwiera aplikację w przeglądarce. */
public class Main {
    private static final Map<String, String> MIME = new HashMap<>();
    static {
        MIME.put("html", "text/html; charset=utf-8");
        MIME.put("js", "application/javascript; charset=utf-8");
        MIME.put("css", "text/css; charset=utf-8");
        MIME.put("jpg", "image/jpeg");
        MIME.put("png", "image/png");
    }

    public static void main(String[] args) throws Exception {
        HttpServer server = start(8765);
        int port = server.getAddress().getPort();
        String url = "http://localhost:" + port + "/index.html";
        System.out.println("Quiz działa pod adresem " + url + " (zamknij okno lub Ctrl+C, aby zakończyć)");
        openBrowser(url);
        if (GraphicsEnvironment.isHeadless()) return;
        SwingUtilities.invokeLater(() -> window(url, server));
    }

    private static HttpServer start(int preferred) throws IOException {
        InetAddress lo = InetAddress.getLoopbackAddress();
        HttpServer s;
        try {
            s = HttpServer.create(new InetSocketAddress(lo, preferred), 0);
        } catch (IOException busy) {
            s = HttpServer.create(new InetSocketAddress(lo, 0), 0);
        }
        s.createContext("/", Main::serve);
        s.start();
        return s;
    }

    private static void serve(HttpExchange ex) throws IOException {
        String path = ex.getRequestURI().getPath();
        if (path.equals("/")) path = "/index.html";
        if (path.contains("..")) { ex.sendResponseHeaders(400, -1); ex.close(); return; }
        try (InputStream in = Main.class.getResourceAsStream("/www" + path)) {
            if (in == null) { ex.sendResponseHeaders(404, -1); return; }
            byte[] data = in.readAllBytes();
            String ext = path.substring(path.lastIndexOf('.') + 1);
            ex.getResponseHeaders().set("Content-Type", MIME.getOrDefault(ext, "application/octet-stream"));
            ex.sendResponseHeaders(200, data.length);
            try (OutputStream os = ex.getResponseBody()) { os.write(data); }
        } finally {
            ex.close();
        }
    }

    private static void openBrowser(String url) {
        try {
            if (Desktop.isDesktopSupported() && Desktop.getDesktop().isSupported(Desktop.Action.BROWSE)) {
                Desktop.getDesktop().browse(URI.create(url));
            }
        } catch (Exception e) {
            System.out.println("Nie udało się otworzyć przeglądarki – wejdź ręcznie na " + url);
        }
    }

    private static void window(String url, HttpServer server) {
        JFrame f = new JFrame("Sieci komputerowe – Kolokwium");
        f.setDefaultCloseOperation(JFrame.DO_NOTHING_ON_CLOSE);
        JPanel p = new JPanel(new GridLayout(0, 1, 8, 8));
        p.setBorder(BorderFactory.createEmptyBorder(16, 16, 16, 16));
        JLabel l = new JLabel("<html><b>Quiz działa:</b> " + url + "<br>Zamknięcie tego okna wyłącza quiz.</html>");
        JButton open = new JButton("Otwórz w przeglądarce");
        open.addActionListener(e -> openBrowser(url));
        JButton quit = new JButton("Zakończ");
        quit.addActionListener(e -> { server.stop(0); System.exit(0); });
        p.add(l); p.add(open); p.add(quit);
        f.addWindowListener(new java.awt.event.WindowAdapter() {
            @Override public void windowClosing(java.awt.event.WindowEvent e) { server.stop(0); System.exit(0); }
        });
        f.setContentPane(p);
        f.pack();
        f.setLocationRelativeTo(null);
        f.setVisible(true);
    }
}
