import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:webview_flutter/webview_flutter.dart';

void main() {
  runApp(GetMaterialApp(
    debugShowCheckedModeBanner: false,
    home: HomePage(),
  ));
}

class HomeController extends GetxController {
  WebViewController? webViewController = null;

  @override
  void dispose() {
    // TODO: implement dispose
    super.dispose();
  }
}

class HomePage extends GetView<HomeController> {
  @override
  Widget build(BuildContext context) {
    return GetBuilder<HomeController>(
      init: HomeController(),
      builder: (_) {
        return WillPopScope(
          onWillPop: () async {
            if (_.webViewController != null) {
              if (await _.webViewController!.canGoBack()) {
                _.webViewController!.goBack();
                return false;
              }
            }
            return true;
          },
          child: SafeArea(
              child: WebView(
            onWebViewCreated: (controller) async {
              _.webViewController = controller;
              // Remove for production
              // await _.webViewController?.clearCache();
            },
            // TODO: Change url for production
            initialUrl: "https://70b0-82-22-37-31.eu.ngrok.io/",
            javascriptMode: JavascriptMode.unrestricted,
          )),
        );
      },
    );
  }
}
