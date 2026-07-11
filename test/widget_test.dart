import 'package:flutter_test/flutter_test.dart';

import 'package:devops_first_deploy/main.dart';

void main() {
  testWidgets('shows the deployment message', (WidgetTester tester) async {
    await tester.pumpWidget(const MyApp());

    expect(find.text('Deployed first webapp'), findsOneWidget);
  });
}
